import type { IRouterDependecies } from '@/interfaces/IRouterDependencies';
import { Router } from 'express';

export class MainRouter {
  public readonly router: Router = Router();

  constructor(private deps: IRouterDependecies) {
    this.initRoutes(deps);
  }

  private initRoutes(deps: IRouterDependecies): void {
    this.router.use('/users', deps.userRouter.router);
    this.router.use('/auth', deps.authRouter.router);
  }
}
