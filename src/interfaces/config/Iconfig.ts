import type { IDbConfig } from './IDbConfig';

export interface IServerConfig {
  port: number;
  db: IDbConfig;
}
