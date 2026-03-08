import type { IAuthConfig } from '@/interfaces/config/IAuthConfig';
import { AppError, HttpStatus } from '@/utils';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ServerConfig } from '@/config/config';
import type { IUserJWTPayload } from '@/interfaces/IUserJWTPayload';

export class AuthService {
  private saltRounds: number;
  private jwtSecret: string;

  constructor() {
    this.saltRounds = ServerConfig.auth.saltRounds;
    this.jwtSecret = ServerConfig.auth.jwtSecret;
  }

  private async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  public generateToken(payload: IUserJWTPayload): string {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: '1h',
    });
  }

  public async login(
    password: string,
    userHash: string,
    payload: IUserJWTPayload
  ) {
    const isPasswordValid = await this.comparePassword(password, userHash);

    if (!isPasswordValid)
      throw new AppError('Unauthorized', HttpStatus.UNAUTHORIZED);

    const token = this.generateToken(payload);

    return token;
  }
}
