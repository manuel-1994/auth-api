import type { UserController } from '@/controllers/user.controller';
import { Router } from 'express';

export class UserRouter {
  public readonly router = Router();

  constructor(private userController: UserController) {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/', this.userController.register);
    this.router.get('/', this.userController.getUsers);
    this.router.get('/:id', this.userController.getUserById);
    this.router.patch('/:id', this.userController.updateUser);
    this.router.delete('/:id', this.userController.deleteUser);
  }
}
