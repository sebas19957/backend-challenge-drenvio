import { Request, Response, NextFunction } from "express";

// Definir una interfaz personalizada para errores con 'status'
interface CustomError extends Error {
  status?: number;
  message: string;
}

/**
 * Middleware global de manejo de errores
 */
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
  });
};
