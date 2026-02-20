import type { IResponse } from './IResponse';

export interface IService<T> {
  create(data: T): Promise<IResponse<T>>;
  get(query: T): Promise<IResponse<T>>;
  getAll(): Promise<IResponse<T[]>>;
  update(id: string, data: T): Promise<IResponse<T>>;
  delete(id: string): Promise<IResponse<any>>;
}
