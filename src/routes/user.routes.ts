import type { UserController } from '@/controllers/user.controller';
import {
  updateUserSchema,
  userIdSchema,
  userSchema,
  validateFields,
} from '@/middlewares';
import { Router } from 'express';

export class UserRouter {
  public readonly router = Router();

  constructor(private userController: UserController) {
    this.initRoutes();
  }

  private initRoutes() {
    const validateId = [userIdSchema, validateFields];

    this.router.post(
      '/',
      userSchema,
      validateFields,
      this.userController.register
    );
    this.router.get('/', this.userController.getUsers);
    this.router.get('/:id', ...validateId, this.userController.getUserById);
    this.router.patch(
      '/:id',
      ...validateId,
      updateUserSchema,
      validateFields,
      this.userController.updateUser
    );
    this.router.delete('/:id', ...validateId, this.userController.deleteUser);
  }
}
