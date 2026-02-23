import type { Application } from 'express';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import type { DataBase } from './config/database';
import type { ServerConfig } from './config/config';
import type { MainRouter } from './routes';
import { errorHandler } from './middlewares';

export class Server {
  private app: Application;

  constructor(
    private config: ServerConfig,
    private db: DataBase,
    private mainRouter: MainRouter
  ) {
    this.app = express();

    this.setMiddlewares();
    this.setRoutes();

    this.app.use(errorHandler);
  }

  private setMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private setRoutes() {
    this.app.use('/api', this.mainRouter.router);
  }

  public async start() {
    await this.db.connect();

    await this.app.listen(this.config.port);
    console.log(`API on http://localhost:${this.config.port}`);
  }
}
