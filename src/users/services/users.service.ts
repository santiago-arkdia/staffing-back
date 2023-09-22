/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';
import { UserEntity, UserDocument } from './../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { error } from 'console';
// import { LoginUserDto } from '../dto/loginUser.dto';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      console.log(user);
      return user;
    } catch (error) {
      throw new Error(`Error searching for user by email: ${error.message}`);
    }
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new error('Usuario no encontrado');
    }

    if (updateUserDto.description !== undefined) {
      user.descripcion = updateUserDto.description;
    }

    if (updateUserDto.image !== undefined) {
      user.image = updateUserDto.image;
    }

    if (updateUserDto.password !== undefined) {
      //  Falta aplicar mecanismos de seguridad, como el hash de la contraseña
      user.password = updateUserDto.password;
    }

    await user.save();

    return user;
  }

  async findOne(id: string) {
    console.log(`This action returns a #${id} user`);
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndRemove(id);
    if (!deletedUser) {
      throw new error(`El usuario con ID ${id} no se encontró`);
    }
    return `Usuario con ID ${id} eliminado correctamente`;
  }
}
