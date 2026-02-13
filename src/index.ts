import { ServerConfig } from './config/config';
import { DataBase } from './config/database';
import { MainRouter, UserRouter } from './routes';
import { Server } from './Server';

const config = new ServerConfig();

const db = new DataBase(config.db);

const userRouter = new UserRouter();

const router = new MainRouter({
  userRouter,
});

const server = new Server(config, db, router);

server.start().catch((err) => {
  console.error('Failed to start application', err);
  process.exit(1);
});
