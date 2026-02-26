import type { CookieOptions } from 'express';

export interface ICookieConfig {
  cookieName: string;
  cookieOptions: CookieOptions;
}
