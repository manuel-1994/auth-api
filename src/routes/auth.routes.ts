import type { AuthController } from '@/controllers';
import { userSchema, validateFields } from '@/middlewares';
import { Router } from 'express';

export class AuthRouter {
  public readonly router = Router();

  constructor(private authController: AuthController) {
    this.initRoutes();
  }

  private initRoutes() {
    const validateRegister = [userSchema, validateFields];

    this.router.post('/login', this.authController.login);
    this.router.post(
      '/register',
      ...validateRegister,
      this.authController.register
    );
    this.router.post('/logout', this.authController.logout);
  }
}
