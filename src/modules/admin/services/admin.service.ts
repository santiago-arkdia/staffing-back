import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../entities/admin.entity';
import { AdminsDto } from '../dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}

  async create(admin: AdminsDto): Promise<Admin> {
    const createdAdmin = new this.adminModel(admin);
    return await createdAdmin.save();
  }

  async update(id: string, admin: AdminsDto): Promise<Admin> {
    return await this.adminModel.findByIdAndUpdate(id, admin, { new: true });
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminModel.find().exec();
  }

  async findOne(id: string): Promise<Admin> {
    return await this.adminModel.findById(id).exec();
  }

  async findBy(by: string, value: string, key: string): Promise<Admin[]> {
    if (key) {
      const query = {
        [key]: {
          $elemMatch: {
            [by]: value,
          },
        },
      };
      return await this.adminModel.find(query).exec();
    } else {
      const query = { [by]: value };
      return await this.adminModel.find(query).exec();
    }
  }

  async findByQuery(query: []): Promise<Admin[]> {
    return await this.adminModel.find(query).exec();
  }
}
