/* eslint-disable prettier/prettier */
import {Body, Controller, Get, Param, Post, Put,} from '@nestjs/common';
import {CreateUserDto} from '../dto/create-users-externals.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { UsersExternalService } from '../services/users-externals.service';
import { UserExternal } from '../entities/users-externals.entity';


@ApiBearerAuth()
@ApiTags('Users External')
@Controller('api/users-external')
export class UsersController {
  constructor(private readonly usersExternalService: UsersExternalService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserExternal> {
    return await this.usersExternalService.create(user);
  }
  
}
