import { Router } from 'express';

export class MainRouter {
  private router: Router = Router();

  public init(): Array<Router> {
    return [
      this.router.get('/user', () => {
        console.log('hola');
      }),
    ];
  }
}
