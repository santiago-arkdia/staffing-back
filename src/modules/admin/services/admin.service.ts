import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../entities/admin.entity';
import { CreateAdminsDto } from '../dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private readonly adminModel: Model<Admin>) {}

  async create(admin: CreateAdminsDto): Promise<Admin> {
    const createdAdmin = new this.adminModel(admin);
    return await createdAdmin.save();
  }

  async update(id: string, admin: Admin): Promise<Admin> {
    return await this.adminModel.findByIdAndUpdate(id, admin, { new: true });
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminModel.find().exec();
  }

  async findOne(id: string): Promise<Admin> {
    return await this.adminModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<Admin[]> {
    const query = { [by]: value };
    return await this.adminModel.find(query).exec();
  }
}
