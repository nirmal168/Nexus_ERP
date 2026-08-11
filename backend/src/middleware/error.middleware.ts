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
  const statusCode = err.statusCode ?? 500;
  const message =
    statusCode === 500 ? "Internal server error" : (err.message ?? "Something went wrong");

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
