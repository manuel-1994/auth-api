import type { IResponse } from './IResponse';

export interface IService<T> {
  create(data: T): Promise<T>;
  get(query: T): Promise<T>;
  getAll(): Promise<T[]>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<void>;
}
