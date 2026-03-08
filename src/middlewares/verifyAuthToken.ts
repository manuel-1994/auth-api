import { ServerConfig } from '@/config/config';
import type { IUserJWTPayload } from '@/interfaces/IUserJWTPayload';
import type { IUserRequest } from '@/interfaces/IUserRequest';
import { AppError } from '@/utils';
import type { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuthToken = (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { access_token } = req.cookies;
  const accessToken = access_token;

  if (!accessToken) throw new AppError('Unauthorized', 401);

  try {
    const payload = jwt.verify(
      accessToken,
      ServerConfig.auth.jwtSecret
    ) as IUserJWTPayload;

    req.user = payload;

    next();
  } catch (error) {
    next(new AppError('token invalid', 401));
  }
};
