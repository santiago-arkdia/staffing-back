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
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './../services/users.service';
import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from './../entities/user.entity';

@ApiBearerAuth()
@ApiTags('usuarios')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto, @Req() req) {
    const currentUser: UserEntity = req.user;
    const createdByEmail = currentUser.email;
    return this.usersService.createUser(
      currentUser,
      createUserDto,
      createdByEmail,
    );
  }
  // @Post()
  // createUser(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createUser(createUserDto);
  // }

  @UseGuards(AuthGuard)
  @Get('roles-permitted')
  async getRolesPermitted(@Req() req){
    // console.log("roles permited", req)
    const currentUser: UserEntity = req.user; // Supongo que tu usuario actual está en req.user
    // console.log(currentUser)
    return this.usersService.getRolesPermitted(currentUser);
    // return currentUser
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.usersService.remove(id);
      return { message: result };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `El usuario con ID ${id} no se encontró`,
      );
    }
  }

  // @Get('roles-permitted')
  // async getRolesPermitted(@Req() req): Promise<string[]> {
  //   const currentUser: UserEntity = req.user; // Supongo que tu usuario actual está en req.user
  //   return this.usersService.getRolesPermitted(currentUser);
  // }

  // @UseGuards(AuthGuard)
  // @Post()
  // createUser(@Body() createUserDto: CreateUserDto, @Req() req) {
  //   const currentUser: UserEntity = req.user;
  //   const createdByEmail = currentUser.email;
  //   return this.usersService.createUser(currentUser, createUserDto, createdByEmail);
  // }

}
