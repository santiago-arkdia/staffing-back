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
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserClientDto } from '../dto/create-user-client.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { UserEntity } from '../entities/user.entity';

//@ApiBearerAuth()
@ApiTags('Usuarios')
@Controller('api/users')

/*
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

  @UseGuards(AuthGuard)
  @Post('/client')
  createUserClient(@Body() createUserClient: CreateUserClientDto, @Req() req) {
    const currentUser: UserEntity = req.user;
    const createdByEmail = currentUser.email;
    return this.usersService.createUserClient(
      currentUser,
      createUserClient,
      createdByEmail,
    );
  }
  // @Post()
  // createUser(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createUser(createUserDto);
  // }

  @UseGuards(AuthGuard)
  @Get('roles-permitted')
  async getRolesPermitted(@Req() req) {
    const currentUser: UserEntity = req.user;
    // console.log(currentUser)
    return this.usersService.getRolesPermitted(currentUser);
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

  // @UseGuards(AuthGuard)
  // @Get(':role')
  // findByRole(@Param('role') role: string) {
  //   console.log(role)
  //   return this.usersService.findByRole(role);
  // }

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
*/



@ApiBearerAuth()
@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() payroll: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.create(payroll);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<UserEntity> {
    console.log("payroll");
    return await this.usersService.update(id, user);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<UserEntity[]> {
    return await this.usersService.findBy(by, value);
  }
}