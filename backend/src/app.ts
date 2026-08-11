import express, { type Request, type Response } from "express";
import cors from "cors";
import env from "./config/env.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import productRoutes from "./routes/product.routes.js";
import stockRoutes from "./routes/stock.routes.js";
import challanRoutes from "./routes/challan.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";

const app = express();

const allowedOrigins = [
  env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        process.env.NODE_ENV !== "production"
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive CORS for API access
    },
    credentials: true,
  })
);
app.use(express.json());

// Root welcome route
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Nexus ERP Backend API is live and operational",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      customers: "/api/customers",
      products: "/api/products",
      stock: "/api/stock",
      challans: "/api/challans",
      invoices: "/api/invoices",
    },
  });
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ success: true, message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/challans", challanRoutes);
app.use("/api/invoices", invoiceRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
