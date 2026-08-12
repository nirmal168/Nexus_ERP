import type { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
}

export function errorMiddleware(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  let statusCode = err.statusCode ?? 500;
  let message = statusCode === 500 ? "Internal server error" : (err.message ?? "Something went wrong");

  // Handle Prisma unique constraint violation code P2002
  if ((err as any).code === "P2002") {
    statusCode = 409;
    const target = Array.isArray((err as any).meta?.target) ? (err as any).meta.target.join(", ") : "value";
    message = `A record with this ${target} already exists. Please enter a unique SKU/mobile/email.`;
  }

  if (statusCode === 500) {
    console.error(`[ERROR] ${err.message}`);
  }

  res.status(statusCode).json({ success: false, message });
}

export function createError(message: string, statusCode: number): AppError {
  const err: AppError = new Error(message);
  err.statusCode = statusCode;
  return err;
}
