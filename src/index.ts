import { ServerConfig } from './config/config';
import { DataBase } from './db/database';
import { Server } from './Server';

const config = new ServerConfig();

const db = new DataBase(config.db);

const server = new Server(config, db);

server.start().catch((err) => {
  console.error('Failed to start application', err);
  process.exit(1);
});
