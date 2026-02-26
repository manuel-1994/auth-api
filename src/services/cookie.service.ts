import type { ICookieConfig } from '@/interfaces/config/ICookieConfig';
import type { CookieOptions, Response } from 'express';

export class CookieService {
  private cookieName: string;
  private cookieOptions: CookieOptions;

  constructor(private cookieConfig: ICookieConfig) {
    this.cookieName = this.cookieConfig.cookieName;
    this.cookieOptions = this.cookieConfig.cookieOptions;
  }

  public setAuthCookie(res: Response, token: string): void {
    res.cookie(this.cookieName, token, this.cookieOptions);
  }

  public clearAuthCookie(res: Response): void {
    const { maxAge, ...cookieOptions } = this.cookieOptions;
    res.clearCookie(this.cookieName, cookieOptions);
  }
}
