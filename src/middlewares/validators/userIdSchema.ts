import { HttpStatus } from '@/utils';
import { checkSchema } from 'express-validator';

export const userIdSchema = checkSchema({
  id: {
    in: 'params',
    isMongoId: {
      errorMessage: {
        message: 'User not found',
        statusCode: HttpStatus.NOT_FOUND,
      },
    },
  },
});
