import { ServerConfig } from './config/config';
import { DataBase } from './db/database';
import { MainRouter } from './routes';
import { Server } from './Server';

const config = new ServerConfig();

const db = new DataBase(config.db);

const router = new MainRouter();

const server = new Server(config, db, router);

server.start().catch((err) => {
  console.error('Failed to start application', err);
  process.exit(1);
});
