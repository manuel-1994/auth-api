export default abstract class ConfigServer {
  public get env() {
    return {
      PORT: this.getNumberEnviroment('PORT') || 3000,
      DB_URI:
        this.getEnviroment('DB_URI') || 'mongodb://localhost:27017/auth_api_db',
      NODE_ENV: this.getEnviroment('NODE_ENV') || 'development',
      JWT_SECRET: this.getEnviroment('JWT_SECRET') || 'your_jwt_secret_key',
      JWT_EXPIRES_IN: this.getEnviroment('JWT_EXPIRES_IN') || '1d',
      BCRYPT_SALT_ROUNDS: this.getNumberEnviroment('BCRYPT_SALT_ROUNDS') || 10,
    };
  }

  private getEnviroment(key: string): string | undefined {
    return process.env[key];
  }

  private getNumberEnviroment(key: string): number | undefined {
    return Number(this.getEnviroment(key));
  }
}
