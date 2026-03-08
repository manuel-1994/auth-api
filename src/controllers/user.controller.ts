import type { UserDTO } from '@/models/user.model';
import type { UserService } from '@/services/user.service';
import { HttpResponse, HttpStatus } from '@/utils';
import type { NextFunction, Request, Response } from 'express';

export class UserController {
  constructor(private userService: UserService) {}

  private sanitizeData(data: UserDTO | UserDTO[]) {
    const isArray = Array.isArray(data);

    const imputAsArray = isArray ? data : [data];

    const transformedData = imputAsArray.map((item) => {
      const { password, ...safeItem } = item;
      return safeItem;
    });

    return isArray ? transformedData : transformedData[0];
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this.userService.create(req.body);
      const userWithoutPassword = this.sanitizeData(newUser);

      HttpResponse.send(
        res,
        HttpStatus.CREATED,
        'User created',
        userWithoutPassword
      );
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
      const userWithoutPassword = this.sanitizeData(user);

      HttpResponse.send(res, HttpStatus.OK, 'OK', userWithoutPassword);
    } catch (error: any) {
      next(error);
    }
  };

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAll();
      const usersWithoutPassword = this.sanitizeData(users);

      HttpResponse.send(res, HttpStatus.OK, 'OK', usersWithoutPassword);
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
      const userWithoutPassword = this.sanitizeData(userUpdated);

      HttpResponse.send(
        res,
        HttpStatus.CREATED,
        'success',
        userWithoutPassword
      );
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
