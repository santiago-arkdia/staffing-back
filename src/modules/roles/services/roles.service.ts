import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles } from '../entities/roles.entity';
import { CreateRolesDto } from '../dto/create-roles.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles.name) private readonly rolesModel: Model<Roles>) {}

  async create(roles: CreateRolesDto): Promise<Roles> {
    const createdRoles = new this.rolesModel(roles);
    return await createdRoles.save();
  }

  async update(id: string, roles: Roles): Promise<Roles> {
    return await this.rolesModel.findByIdAndUpdate(id, roles, { new: true });
  }

  async findAll(): Promise<Roles[]> {
    return await this.rolesModel.find().exec();
  }

  async findOne(id: string): Promise<Roles> {
    return await this.rolesModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<Roles[]> {
    const query = { [by]: value };
    return await this.rolesModel.find(query).exec();
  }
}
