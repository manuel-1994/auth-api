import type { AuthService, CookieService, UserService } from '@/services';
import { HttpResponse, HttpStatus } from '@/utils';
import type { NextFunction, Request, Response } from 'express';

export class AuthController {
  constructor(
    readonly authSErvice: AuthService,
    readonly cookieService: CookieService,
    readonly userService: UserService
  ) {}

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;

      const hashedPassword = await this.authSErvice.hashPassword(password);

      const newUser = await this.userService.create({
        username,
        email,
        password: hashedPassword,
      });

      const token = await this.authSErvice.generateToken(newUser._id);

      this.cookieService.setAuthCookie(res, token);

      HttpResponse.send(res, HttpStatus.OK, `Welcome ${newUser.username}`);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.get({ email });

      const token = await this.authSErvice.login(
        password,
        user.password,
        user._id
      );

      this.cookieService.setAuthCookie(res, token);

      HttpResponse.send(res, HttpStatus.OK, `Welcome ${user.username}`);
    } catch (error: any) {
      next(error);
    }
  };

  public logout = (req: Request, res: Response) => {
    this.cookieService.clearAuthCookie(res);
    HttpResponse.send(res, HttpStatus.OK, 'Logged out successfully');
  };
}
