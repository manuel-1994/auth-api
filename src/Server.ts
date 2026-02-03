import type { Application } from 'express';
import express from 'express';
import ConfigServer from './config/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export class Server extends ConfigServer {
  private app: Application = express();
  private port: number = this.env.PORT;

  private constructor() {
    super();
    this.middlewares();
    this.dbConnection();
    this.routes();
  }

  public static init(): Server {
    return new this();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(cookieParser());
  }

  private async dbConnection(): Promise<void> {
    try {
    } catch (error) {}
  }

  private routes() {}

  public async listen() {
    await this.app.listen(this.port);
    console.log(`API on http://localhost:${this.port}`);
  }
}
