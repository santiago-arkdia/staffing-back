/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class ConnectionController {
  constructor(private readonly usersService: AppService) {}

  @Get('check-connection')
  async checkConnection() {
    try {
      await this.usersService.checkMongoDBConnection();
      console.log('Connected to MongoDB Atlas')
      return 'Connected to MongoDB Atlas';
    } catch (error) {
      return 'Not connected to MongoDB Atlas';
    }
  }
}