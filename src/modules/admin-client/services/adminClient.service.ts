/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminClient } from '../entities/adminClient.entity';
import { CreateClientsDto } from '../dto/create-adminClient.dto';
import { FilterAdminClientsDto } from '../dto/filter-admin.dto.';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(AdminClient.name)
    private readonly clientModel: Model<AdminClient>,
  ) {}

  async create(client: CreateClientsDto): Promise<AdminClient> {
    const createdClient = new this.clientModel(client);
    return await createdClient.save();
  }

  async update(id: string, client: AdminClient): Promise<AdminClient> {
    return await this.clientModel.findByIdAndUpdate(id, client, { new: true });
  }

  async findAll(page: number, limit: number): Promise<AdminClient[]> {

    const total = await this.clientModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit)

    const adminClients = await this.clientModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: 'user',
        populate: {
          path: 'role',
        },
      })
      .exec();

      let adminClient: any = {};
      adminClient.total = total;
      adminClient.pages = totalPages;
      adminClient.data = adminClients;

      return adminClient;
  }

  async findOne(id: string): Promise<AdminClient> {
    return await this.clientModel
      .findById(id)
      .populate({
        path: 'user',
        populate: {
          path: 'role',
        },
      })
      .exec();
  }

  async findBy(by: string, value: string): Promise<AdminClient[]> {
    const query = { [by]: value };
    return await this.clientModel
        .find(query)
        .populate({
          path: 'user',
          populate: {
            path: 'role',
          },
        })
        .exec();
  }

  async getAdminsClientsByFilters(page: number, limit: number, filter: FilterAdminClientsDto): Promise<AdminClient[]> {

    const query: any = {};

    if (filter.name) {
        query.name = { $regex: filter.name, $options: 'i' };
    }

    if (filter.lastName) {
        query.lastName = { $regex: filter.lastName, $options: 'i' };
    }

    if (filter.state) {
        query.state = filter.state;
    }

    const admins =  await this.clientModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: 'user',
        populate: {
          path: 'role',
        },
      })
      .exec();

    const total = await this.clientModel.countDocuments(query).exec();
    const totalPages = Math.ceil(total / limit)

    let admin: any = {};
    admin.total = total;
    admin.pages = totalPages;
    admin.data = admins;

    return admin;
  }

}
