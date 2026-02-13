import { Router } from 'express';

export class UserRouter {
  public readonly router = Router();

  //TODO: AGREGAR EL CONTROLADOR COMO DEPENDENCIA
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/', () => {
      console.log('hola');
    });
  }
}
