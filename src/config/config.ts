import type { IServerConfig } from '@/interfaces/config/Iconfig';
import type { IDbConfig } from '@/interfaces/config/IDbConfig';

export class ServerConfig implements IServerConfig {
  public readonly port: number = this.getNumberEnviroment('PORT') || 3000;
  public readonly db: IDbConfig = {
    uri: this.getEnviroment('DB_URI') || 'mongodb://localhost:27017',
    name: this.getEnviroment('DB_NAME') || 'auth_api_db',
  };

  private getEnviroment(key: string): string | undefined {
    return process.env[key];
  }

  private getNumberEnviroment(key: string): number | undefined {
    return Number(this.getEnviroment(key));
  }
}
