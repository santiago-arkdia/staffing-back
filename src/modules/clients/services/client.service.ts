/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../entities/client.entity';
import { CreateClientsDto } from '../dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
  ) {}

  async create(client: CreateClientsDto): Promise<Client> {
    const createdClient = new this.clientModel(client);
    return await createdClient.save();
  }

  async update(id: string, client: Client): Promise<Client> {
    return await this.clientModel.findByIdAndUpdate(id, client, { new: true });
  }

  async findAll(page: number, limit: number): Promise<Client[]> {
    
    const total = await this.clientModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit)

    const clients = await this.clientModel.find()
      .skip((page - 1) * limit)
      .populate({
        path: 'user',
        populate: {
          path: 'role',
        },
      })
      .exec();

      let client: any = {};
      client.total = total;
      client.pages = totalPages;
      client.data = clients;

      return client;
  }

  async findOne(id: string): Promise<Client> {
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

  async findBy(by: string, value: string): Promise<Client[]> {
    const query = { [by]: value };
    return await this.clientModel.find(query).exec();
  }
}
