/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminClient } from '../entities/adminClient.entity';
import { CreateClientsDto } from '../dto/create-adminClient.dto';

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

  async findAll(): Promise<AdminClient[]> {
    return await this.clientModel.find().exec();
  }

  async findOne(id: string): Promise<AdminClient> {
    return await this.clientModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<AdminClient[]> {
    const query = { [by]: value };
    return await this.clientModel.find(query).exec();
  }
}
