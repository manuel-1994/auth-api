import type { UserService } from '@/services/user.service';
import type { Request, Response } from 'express';

export class UserController {
  constructor(private userService: UserService) {}

  public register = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const _id = req.params.id as string;

      const response = await this.userService.get({ _id });
      if (response.success)
        return res.status(200).json({
          statusCode: 200,
          message: response.message,
          data: response.data,
        });
      return res
        .status(404)
        .json({ statusCode: 404, message: response.message });
    } catch (error: any) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server Error',
        error: error.message,
      });
    }
  };

  public getUsers = async (req: Request, res: Response) => {
    try {
      const response = await this.userService.getAll();
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(500).json({
        StatusCode: 500,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const response = await this.userService.update(id, req.body);

      if (response.success) return res.status(201).json(response);
      return res.status(404).json(response);
    } catch (error: any) {
      return res.status(500).json({
        StatusCode: 500,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const response = await this.userService.delete(id);

      if (response.success) return res.status(204).json(response);
      return res.status(404).json(response);
    } catch (error: any) {
      return res.status(500).json({
        StatusCode: 500,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };
}
