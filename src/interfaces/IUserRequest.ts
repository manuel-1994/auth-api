import type { Request } from 'express';
import type { IUserJWTPayload } from './IUserJWTPayload';

export interface IUserRequest extends Request {
  user?: IUserJWTPayload;
}
