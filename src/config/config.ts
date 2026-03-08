import type { IAuthConfig } from '@/interfaces/config/IAuthConfig';
import type { IServerConfig } from '@/interfaces/config/Iconfig';
import type { ICookieConfig } from '@/interfaces/config/ICookieConfig';
import type { IDbConfig } from '@/interfaces/config/IDbConfig';

export class ServerConfig implements IServerConfig {
  private getEnviroment(key: string): string | undefined {
    return process.env[key];
  }

  private getNumberEnviroment(key: string): number | undefined {
    return Number(this.getEnviroment(key));
  }

  static readonly auth: IAuthConfig = {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
    saltRounds: Number(process.env.SALT_ROUNDS) || 10,
  };

  public readonly port: number = this.getNumberEnviroment('PORT') || 3000;

  public readonly db: IDbConfig = {
    uri: this.getEnviroment('DB_URI') || 'mongodb://localhost:27017',
    name: this.getEnviroment('DB_NAME') || 'auth_api_db',
  };

  public readonly cookie: ICookieConfig = {
    cookieName: this.getEnviroment('COOKIE_NAME') || 'access_token',
    cookieOptions: {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
      path: '/',
    },
  };
}
