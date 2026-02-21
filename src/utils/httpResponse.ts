import type { Response } from 'express';

export class HttpResponse {
  static send(res: Response, status: number, message?: string, data?: any) {
    res.status(status).json({
      status,
      message,
      data,
    });
  }
}
