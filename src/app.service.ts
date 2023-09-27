/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private readonly mongooseConnection: Connection,
  ) {}
  getHello(): string {
    return 'Hello STAFFING!';
  }

  async checkMongoDBConnection(): Promise<void> {
    if (this.mongooseConnection.readyState !== 1) {
      throw new Error('Not connected to MongoDB Atlas');
    }
  }
}
