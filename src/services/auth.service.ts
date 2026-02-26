import type { IAuthConfig } from '@/interfaces/config/IAuthConfig';
import { AppError, HttpStatus } from '@/utils';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthService {
  private saltRounds: number;
  private jwtSecret: string;

  constructor(private authConfig: IAuthConfig) {
    this.saltRounds = authConfig.saltRounds;
    this.jwtSecret = authConfig.jwtSecret;
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

  public generateToken(userID: string): string {
    return jwt.sign({ id: userID }, this.jwtSecret, {
      expiresIn: '1h',
    });
  }

  public async login(password: string, userHash: string, userID: string) {
    const isPasswordValid = await this.comparePassword(password, userHash);

    if (!isPasswordValid)
      throw new AppError('Unauthorized', HttpStatus.UNAUTHORIZED);

    const token = this.generateToken(userID);

    return token;
  }
}
