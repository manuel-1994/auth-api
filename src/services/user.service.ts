import type { IService } from '@/interfaces/IService';
import { UserDTO, UserModel } from '@/models/user.model';
import { AppError } from '@/utils/appError';
import { HttpStatus } from '@/utils/httpStatus';

export class UserService implements IService<UserDTO> {
  constructor(private model = UserModel) {}
  public async create(data: UserDTO): Promise<UserDTO> {
    const saveData = await this.model.create(data);
    return saveData;
  }

  public async get(param: UserDTO): Promise<UserDTO> {
    const userFound = await this.model.findOne(param).lean();

    if (!userFound) throw new AppError('User not found', HttpStatus.NOT_FOUND);

    return userFound;
  }

  public async getAll(): Promise<UserDTO[]> {
    const users = await this.model.find().lean();

    return users;
  }

  public async update(id: string, data: UserDTO): Promise<UserDTO> {
    const saveData = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .lean();

    if (!saveData) throw new AppError('User not found', HttpStatus.NOT_FOUND);

    return saveData;
  }

  public async delete(id: string): Promise<void> {
    const dataDeleted = await this.model.findByIdAndDelete(id);

    if (!dataDeleted)
      throw new AppError('User not found', HttpStatus.NOT_FOUND);
  }
}
