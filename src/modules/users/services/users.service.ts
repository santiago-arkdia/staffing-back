/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity, UserDocument } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserClientDto } from '../dto/create-user-client.dto';
import * as bcrypt from 'bcryptjs';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,

  ) {}


  async create(user: CreateUserDto): Promise<UserEntity> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    const createdUser = new this.userModel({ ...user, password: hashedPassword })
    // const createdUser= new this.userModel(user);
    return await createdUser.save();
  }

  async update(id: string, user: UpdateUserDto): Promise<UserEntity> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.userModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<UserEntity[]> {
    const query = { [by]: value };
    return await this.userModel.find(query).exec();
  }

  async createUser(
    currentUser: UserEntity,
    createUserDto: CreateUserDto,
    createdByEmail: string,
  ) {
    // if (!this.canCreateUser(currentUser.role, createUserDto.role)) {
    //   throw new Error('No tienes permiso para crear este tipo de usuario.');
    // }
    const newUser = new this.userModel(createUserDto);
    //newUser.createdBy = createdByEmail;
    return newUser.save();
  }

  async createUserClient(
    currentUser: UserEntity,
    createUserClientDto: CreateUserClientDto,
    createdByEmail: string,
  ) {
    // if (!this.canCreateUser(currentUser.role, createUserClientDto.role)) {
    //   throw new Error('No tienes permiso para crear este tipo de usuario.');
    // }
    const newUser = new this.userModel(createUserClientDto);
    //newUser.createdBy = createdByEmail;
    return newUser.save();
  }

  private readonly rolesPermitted: Record<string, string[]> = {
    Admin: [
      'Admin',
      'Nomina',
      'Gestor_Cuenta',
      'Terminaciones',
      'Terminaciones_Analista',
      'Analista_Nomina',
      'Vinculaciones',
      'Vinculaciones_Analista',
      'Seguridad_Social',
      'Seguridad_So_Analista',
      'Juridico',
      'Juridico_Analista',
      'Cliente',
      'Colaborador',
    ],
    Nomina: [
      'Gestor_Cuenta',
      'Terminaciones',
      'Terminaciones_Analista',
      'Analista_Nomina',
      'Vinculaciones',
      'Vinculaciones_Analista',
      'Seguridad_Social',
      'Seguridad_So_Analista',
      'Juridico',
      'Juridico_Analista',
    ],
    Terminaciones: ['Terminaciones_Analista'],
    Vinculaciones: ['Vinculaciones_Analista'],
    SeguridadSocial: ['Seguridad_Social', 'Seguridad_So_Analista'],
    Juridico: ['Juridico', 'Juridico_Analista'],
    Cliente: ['Cliente', 'Colaborador'],
  };

  private canCreateUser(currentUserRole: string, newUserRole: string): boolean {
    const permittedRoles = this.rolesPermitted[currentUserRole];
    if (permittedRoles) {
      return permittedRoles.includes(newUserRole);
    } else {
      return false;
    }
  }

  async getRolesPermitted(currentUser: any): Promise<string[] | null> {
    // console.log(currentUser)
    if (currentUser && currentUser.role in this.rolesPermitted) {
      return this.rolesPermitted[currentUser.role];
    } else {
      return null;
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

  // async findByRole(role: string): Promise<any | null> {
  //   try {
  //     const user = await this.userModel.find({ role }).exec();
  //     return user;
  //   } catch (error) {
  //     throw new Error(`Error searching for user by email: ${error.message}`);
  //   }
  // }

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

    /*if (updateUserDto.description !== undefined) {
      //user.descripcion = updateUserDto.description;
    }*/

    if (updateUserDto.image !== undefined) {
      //user.image = updateUserDto.image;
    }

    if (updateUserDto.password !== undefined) {
      //  Falta aplicar mecanismos de seguridad, como el hash de la contraseña
      user.password = updateUserDto.password;
    }
    await user.save();
    return user;
  }

  /*async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    return user;
  }*/

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndRemove(id).exec();
    if (!deletedUser) {
      throw new Error(`El usuario con ID ${id} no se encontró`);
    }
    return `Usuario con ID ${id} eliminado correctamente`;
  }

  async findOneAndUpdate(id: string, update: Partial<UserEntity>): Promise<UserEntity> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, update, { new: true });
    return updatedUser;
  }

  async updatePassword(id: string, password: string): Promise<UserEntity> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const updatedUser = await this.userModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    return updatedUser;
  }
}
