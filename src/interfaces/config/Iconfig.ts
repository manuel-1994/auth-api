import type { IAuthConfig } from './IAuthConfig';
import type { ICookieConfig } from './ICookieConfig';
import type { IDbConfig } from './IDbConfig';

export interface IServerConfig {
  port: number;
  db: IDbConfig;
  auth: IAuthConfig;
  cookie: ICookieConfig;
}
