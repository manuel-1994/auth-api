import { AppError } from '@/utils';
import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = errors.array()[0];

    if (typeof error.msg === 'string')
      return next(new AppError(error.msg, 400));

    const { message, statusCode } = error.msg;

    return next(new AppError(message, statusCode));
  }

  next();
};
