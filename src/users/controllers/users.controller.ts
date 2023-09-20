/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException,
  // Param,
  // Delete,
  // UseGuards,
} from '@nestjs/common';
import { UsersService } from './../services/users.service';
import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';
// import { ApiBearerAuth } from '@nestjs/swagger';
// import { AuthGuard } from 'src/auth/auth.guard';
// import { UserService } from './../services/users.service';
import { ApiTags } from '@nestjs/swagger';

// @ApiBearerAuth()
@ApiTags('usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(AuthGuard)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log("mirame")
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    // return this.usersService.remove(id);
    try {
      const result = await this.usersService.remove(id);
      return { message: result };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; 
      }
      throw new InternalServerErrorException(`El usuario con ID ${id} no se encontró`); 
    }
  }
}
