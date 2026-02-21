import type { UserService } from '@/services/user.service';
import { HttpResponse, HttpStatus } from '@/utils';
import type { NextFunction, Request, Response } from 'express';

export class UserController {
  constructor(private userService: UserService) {}

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this.userService.create(req.body);
      HttpResponse.send(res, HttpStatus.CREATED, 'User created', newUser);
    } catch (error: any) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const _id = req.params.id as string;
      const user = await this.userService.get({ _id });

      HttpResponse.send(res, HttpStatus.OK, 'OK', user);
    } catch (error: any) {
      next(error);
    }
  };

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAll();
      HttpResponse.send(res, HttpStatus.OK, 'OK', users);
    } catch (error: any) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id as string;
      const userUpdated = await this.userService.update(id, req.body);

      HttpResponse.send(res, HttpStatus.CREATED, 'success', userUpdated);
    } catch (error: any) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id as string;
      await this.userService.delete(id);

      HttpResponse.send(res, HttpStatus.NO_CONTENT);
    } catch (error: any) {
      next(error);
    }
  };
}
