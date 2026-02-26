import { Server } from './Server';
import { ServerConfig } from './config/config';
import { DataBase } from './config/database';
import { AuthRouter, MainRouter, UserRouter } from './routes';
import { AuthService, CookieService, UserService } from './services';
import { AuthController, UserController } from './controllers';

const config = new ServerConfig();

const db = new DataBase(config.db);

const authService = new AuthService(config.auth);
const cookieService = new CookieService(config.cookie);
const userService = new UserService();

const authController = new AuthController(
  authService,
  cookieService,
  userService
);
const userController = new UserController(userService);

const authRouter = new AuthRouter(authController);
const userRouter = new UserRouter(userController);

const router = new MainRouter({
  authRouter,
  userRouter,
});

const server = new Server(config, db, router);

server.start().catch((err) => {
  console.error('Failed to start application', err);
  process.exit(1);
});
