import { AppError } from '@/utils/appError';
import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  console.error(err.message);

  res.status(statusCode).json({ status: statusCode, message });
};
