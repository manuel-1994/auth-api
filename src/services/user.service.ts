import type { IResponse } from '@/interfaces/IResponse';
import type { IService } from '@/interfaces/IService';
import { UserDTO, UserModel } from '@/models/user.model';

export class UserService implements IService<UserDTO> {
  constructor(private model = UserModel) {}
  public async create(data: UserDTO): Promise<IResponse<UserDTO>> {
    const userFound = await this.validateUser(data);

    if (userFound.success) throw new Error('User Found');

    const saveData = await this.model.create(data);
    return { success: true, message: 'User Created', data: saveData };
  }

  public async get(param: UserDTO): Promise<IResponse<UserDTO>> {
    const userFound = await this.model.findOne(param).lean();

    if (userFound) return { success: true, message: 'Ok', data: userFound };

    return { success: false, message: 'User not found' };
  }
  public async getAll(): Promise<IResponse<UserDTO[]>> {
    const users = await this.model.find().lean();

    return { success: true, data: users };
  }

  public async update(id: string, data: UserDTO): Promise<IResponse<UserDTO>> {
    const saveData = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .lean();

    if (saveData) {
      return { success: true, message: 'user updated', data: saveData };
    }

    return { success: false, message: 'user not found' };
  }

  public async delete(id: string): Promise<IResponse<any>> {
    const dataDeleted = await this.model.findByIdAndDelete(id);

    if (dataDeleted) return { success: true, message: 'user deleted' };

    return { success: false, message: 'user not found' };
  }

  private async validateUser(data: UserDTO) {
    const { email, username } = data;

    const userFound = await this.model.findOne({
      $or: [{ email }, { username }],
    });

    if (userFound) return { success: true, message: 'User found' };

    return { success: false };
  }
}
