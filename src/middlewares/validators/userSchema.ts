import { UserModel } from '@/models/user.model';
import { HttpStatus } from '@/utils';
import { checkSchema } from 'express-validator';

export const userSchema = checkSchema({
  email: {
    custom: {
      options: async (value, { req }) => {
        const userFound = await UserModel.findOne({
          $or: [{ email: value }, { username: req.body.username }],
        });

        if (userFound)
          throw {
            message: 'User already exists',
            statusCode: HttpStatus.CONFLICT,
          };
      },
    },
  },
});
