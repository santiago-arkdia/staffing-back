/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';
import { UserEntity, UserDocument } from './../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { LoginUserDto } from '../dto/loginUser.dto';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // async createUser(createUserDto: CreateUserDto) {
  //   const newUser = new this.userModel(createUserDto);
  //   return newUser.save();
  // }
  async createUser(currentUser: UserEntity, createUserDto: CreateUserDto) {
    if (!this.canCreateUser(currentUser.role, createUserDto.role)) {
      throw new Error('No tienes permiso para crear este tipo de usuario.');
    }

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  private readonly rolesPermitted: Record<string, string[]> = {
    Admin: ['Admin','Nomina','GestorCuenta','Terminaciones','TerminacionesAnalista','AnalistaNomina','Vinculaciones','VinculacionesAnalista','SeguridadSocial','SeguridadSoAnalista','Juridico','JuridicoAnalista','Cliente','Colaborador'],
    Nomina: ['GestorCuenta','Terminaciones','TerminacionesAnalista','AnalistaNomina','Vinculaciones','VinculacionesAnalista','SeguridadSocial','SeguridadSoAnalista','Juridico','JuridicoAnalista'],
    Terminaciones: ['TerminacionesAnalista'],
    Vinculaciones:['VinculacionesAnalista'],
    SeguridadSocial: ['SeguridadSocial','SeguridadSoAnalista'],
    Juridico:['Juridico','JuridicoAnalista'],
    Cliente:['Cliente','Colaborador']
  };

  private canCreateUser(currentUserRole: string, newUserRole: string): boolean {
    console.log(currentUserRole)
    const permittedRoles = this.rolesPermitted[currentUserRole];
    if (permittedRoles) {
      console.log("estoy aca, es permitido", permittedRoles)
      return permittedRoles.includes(newUserRole);
    } else {
      return false; 
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
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
      throw new Error('Usuario no encontrado');
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
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndRemove(id);
    if (!deletedUser) {
      throw new Error(`El usuario con ID ${id} no se encontró`);
    }
    return `Usuario con ID ${id} eliminado correctamente`;
  }
}
