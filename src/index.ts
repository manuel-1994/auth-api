import { ServerConfig } from './config/config';
import { DataBase } from './config/database';
import { UserController } from './controllers/user.controller';
import { MainRouter, UserRouter } from './routes';
import { Server } from './Server';
import { UserService } from './services/user.service';

const config = new ServerConfig();

const db = new DataBase(config.db);

const userService = new UserService();

const userController = new UserController(userService)

const userRouter = new UserRouter(userController);

const router = new MainRouter({
  userRouter,
});

const server = new Server(config, db, router);

server.start().catch((err) => {
  console.error('Failed to start application', err);
  process.exit(1);
});
