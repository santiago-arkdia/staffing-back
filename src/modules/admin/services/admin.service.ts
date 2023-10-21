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

  async findAll(page: number, limit: number): Promise<Admin[]> {

    const total = await this.adminModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit)

    const admins = await this.adminModel.find()
      .skip((page - 1) * limit)
      .populate({
        path: 'user',
        populate: {
          path: 'role',
        }, 
      })
      .exec();

      let admin: any = {};
      admin.total = total;
      admin.pages = totalPages;
      admin.data = admins;

      return admin;
  }

  async findOne(id: string): Promise<Admin> {
    return await this.adminModel
      .findById(id)
      .populate({
        path: 'user',
        populate: {
          path: 'role',
        },
      })
      .exec();
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
      return await this.adminModel
        .find(query)
        .populate({
          path: 'user',
          populate: {
            path: 'role',
          },
        })
        .exec();
    } else {
      const query = { [by]: value };
      return await this.adminModel
          .find(query)
          .populate({
            path: 'user',
            populate: {
              path: 'role',
            },
          })
          .exec();
    }
  }

  async findByQuery(query: []): Promise<Admin[]> {
    return await this.adminModel.find(query).exec();
  }
}
