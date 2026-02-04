import mongoose from 'mongoose';
import type { IDbConfig } from '@/interfaces/config/IDbConfig';

export class DataBase {
  constructor(private config: IDbConfig) {}

  public async connect(): Promise<void> {
    const { uri, name } = this.config;
    try {
      await mongoose.connect(uri, { dbName: name });
      console.log('[Mongo] Connected');
    } catch (error) {
      console.error('[Mongo] Connection error:', error);
      process.exit(1);
    }
  }
}
