import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ options: { customName: 'user' } })
class UserDTO {
  public _id?: string;

  @prop({ required: true, unique: true })
  public username?: string;

  @prop({ required: true, unique: true })
  public email?: string;

  @prop({ required: true })
  public password?: string;
}

const UserModel = getModelForClass(UserDTO);

export { UserDTO, UserModel };
