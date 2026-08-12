import type { Request, Response, NextFunction } from "express";
import path from "path";
import { sendSuccess, sendPaginated } from "../utils/response.js";
import * as productService from "../services/product.service.js";
import { uploadToS3, getFromS3 } from "../utils/s3.js";
import prisma from "../config/db.js";
import { createError } from "../middleware/error.middleware.js";
import env from "../config/env.js";

export async function list(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query["page"] as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query["limit"] as string) || 20));
    const result = await productService.listProducts({
      page, limit,
      search: req.query["search"] as string,
      category: req.query["category"] as string,
      lowStock: req.query["lowStock"] === "true",
    });
    // Replace image keys with presigned URLs for frontend consumption (keep DB value unchanged)
    const dataWithUrls = await Promise.all(
      result.data.map(async (p: any) => {
        if (p.imageUrl) {
          if (p.imageUrl.startsWith("data:") || p.imageUrl.startsWith("http://") || p.imageUrl.startsWith("https://")) {
            return p;
          }
          try {
            const url = await getFromS3(p.imageUrl, 3600);
            return { ...p, imageUrl: url };
          } catch (e) {
            return p;
          }
        }
        return p;
      })
    );

    sendPaginated(res, dataWithUrls, result.total, result.page, result.limit);
  } catch (err) { next(err); }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params["id"] as string;
    const product = await productService.getProduct(id);
    if (product && product.imageUrl) {
      if (product.imageUrl.startsWith("data:") || product.imageUrl.startsWith("http://") || product.imageUrl.startsWith("https://")) {
        sendSuccess(res, product);
        return;
      }
      try {
        const url = await getFromS3(product.imageUrl, 3600);
        sendSuccess(res, { ...product, imageUrl: url });
        return;
      } catch (e) {
        // fallthrough
      }
    }
    sendSuccess(res, product);
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body as Record<string, unknown>;
    const product = await productService.createProduct({
      productName: body["productName"] as string,
      sku: body["sku"] as string,
      category: body["category"] as string,
      unitPrice: Number(body["unitPrice"]),
      currentStock: Number(body["currentStock"]),
      minimumStock: Number(body["minimumStock"]),
      warehouseLocation: body["warehouseLocation"] as string,
    });
    sendSuccess(res, product, 201);
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params["id"] as string;
    const product = await productService.updateProduct(id, req.body as Record<string, unknown>);
    sendSuccess(res, product);
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params["id"] as string;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw createError('Product not found', 404);
    await prisma.product.delete({ where: { id } });
    sendSuccess(res, { message: 'Product deleted successfully' });
  } catch (err) { next(err); }
}

export async function uploadProductImage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    if (!id) {
      throw createError("Product ID is required", 400);
    }

    console.log("uploadProductImage called", {
      productId: id,
      filePresent: Boolean(req.file),
      fileMetadata: req.file
        ? {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
          }
        : null,
    });

    if (!req.file) {
      throw createError("No image file provided", 400);
    }

    // Verify product exists
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw createError("Product not found", 404);
    }

    const file = req.file as Express.Multer.File;
    console.log('req.file:', req.file);
    console.log('buffer exists:', !!file.buffer);
    console.log('buffer size:', file.buffer?.length);
    console.log('mimetype:', file.mimetype);

    let fileExt = path.extname(file.originalname);
    if (!fileExt) {
      const extensionFromMime = file.mimetype.split('/')[1] || 'bin';
      fileExt = `.${extensionFromMime}`;
    }

    const filename = `products/${product.sku}-${Date.now()}${fileExt}`;
    console.log("Uploading to S3:", {
      key: filename,
      size: file.buffer?.length,
      contentType: file.mimetype,
    });

    let storedImageUrl = filename;
    let clientImageUrl = filename;

    if (env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY && env.AWS_BUCKET_NAME) {
      try {
        await uploadToS3(filename, file.buffer, file.mimetype);
        console.log("S3 upload SUCCESS:", filename);
        storedImageUrl = filename;
        try {
          clientImageUrl = await getFromS3(filename, 3600);
        } catch {
          clientImageUrl = filename;
        }
      } catch (uploadErr) {
        console.warn("S3 upload failed, falling back to base64 data URI:", uploadErr);
        storedImageUrl = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        clientImageUrl = storedImageUrl;
      }
    } else {
      console.log("No AWS S3 credentials configured, saving image as Base64 Data URL in database");
      storedImageUrl = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      clientImageUrl = storedImageUrl;
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { imageUrl: storedImageUrl },
    });

    const productForClient = { ...updatedProduct, imageUrl: clientImageUrl };
    sendSuccess(res, { imageUrl: storedImageUrl, presignedUrl: clientImageUrl, product: productForClient });
  } catch (err) {
    next(err);
  }
}

export async function getProductImage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const filename = (req.query.filename || req.query.key) as string;
    if (!filename) {
      throw createError("Filename is required", 400);
    }
    const presignedUrl = await getFromS3(filename);
    sendSuccess(res, { presignedUrl });
  } catch (err) {
    next(err);
  }
}