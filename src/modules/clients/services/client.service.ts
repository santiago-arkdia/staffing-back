/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../entities/client.entity';
import { CreateClientsDto } from '../dto/create-client.dto';
import axios, { AxiosResponse } from 'axios';

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
    return this.clientModel.findByIdAndUpdate(id, client, {new: true});
  }

  async findAll(page: number, limit: number): Promise<Client[]> {
    
    const total = await this.clientModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit)

    const clients = await this.clientModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: 'user',
        populate: {
          path: 'role',
        },
      })
      .exec();

      const client: any = {};
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

  async findBy(
      page: number,
      limit: number,
      by: string,
      value: string,
  ): Promise<Client[]> {
    const query = { [by]: { $regex: new RegExp(value, 'i') } };

    const total = await this.clientModel.countDocuments(query).exec();
    const totalPages = Math.ceil(total / limit);

    const country = await this.clientModel
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

    const clients: any = {};
    clients.total = total;
    clients.pages = totalPages;
    clients.data = country;

    return clients;
  }

  async getClientByIdentification(identification: number, initialDate: string, finalDate: string, token: string): Promise<AxiosResponse<any>> {
    const url = 'http://34.214.124.124:9896/ws/clientes/consultar_cliente_documento';
    const data = { documento: identification, fechaInicial:initialDate, fechaFinal:finalDate };
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post(url, data, config);
    return response.data.mensaje;
  }
}
