import { UserModel } from '@/models/user.model';
import { HttpStatus } from '@/utils';
import { checkSchema } from 'express-validator';

export const updateUserSchema = checkSchema({
  email: {
    optional: true,
    isEmail: {
      errorMessage: 'invalid Email',
    },
    custom: {
      options: async (value, { req }) => {
        const exitsEmail = await UserModel.findOne({
          email: value,
          _id: { $ne: req.params?.id },
        });

        if (exitsEmail)
          throw {
            message: 'Email already exist',
            statusCode: HttpStatus.CONFLICT,
          };
      },
    },
  },

  username: {
    optional: true,
    isLength: {
      options: { min: 3 },
      errorMessage: 'Username must be at least 3 characters long',
    },
    custom: {
      options: async (value, { req }) => {
        const existUsername = await UserModel.findOne({
          username: value,
          _id: { $ne: req.params?.id },
        });

        if (existUsername)
          throw {
            message: 'Username already exist',
            statusCode: HttpStatus.CONFLICT,
          };
      },
    },
  },
});
