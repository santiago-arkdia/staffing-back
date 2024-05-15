import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Puc } from '../entities/puc.entity';
import { Model } from 'mongoose';
import { CreatePucDto } from '../dto/create-puc.dto';
import { UpdatePucDto } from '../dto/update-puc.dto';
import { Client } from 'src/modules/clients/entities/client.entity';

@Injectable()
export class PucService {
  constructor(@InjectModel(Puc.name) private readonly pucModel: Model<Puc>, @InjectModel(Client.name) private readonly clientModel: Model<Client>) {}

  async create(puc: CreatePucDto): Promise<Puc> {

    const client = await this.clientModel.findById(puc.client).exec();
    if (!client) {
      throw new Error('Client not found');
    }

    const createdPuc = new this.pucModel(puc);
    const savedPuc = await createdPuc.save();

    client.conceptsPuc.push(savedPuc._id);

    await client.save();

    return savedPuc;

  }

  async update(id: string, puc: UpdatePucDto): Promise<UpdatePucDto> {
    return await this.pucModel.findByIdAndUpdate(id, puc, { new: true });
  }

  async findAll(page: number, limit: number): Promise<Puc[]> {

    const total = await this.pucModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit)

    const pucData = await this.pucModel.find({state: 1})
        .populate("client")
        .exec();

    const puc: any = {};
    puc.total = total;
    puc.pages = totalPages;
    puc.data = pucData;

    return puc;
  }

  async findOne(id: string): Promise<Puc> {
    return await this.pucModel.findById(id)
      .populate("client")
      .exec();
  }

  async findBy(by: string, value: string): Promise<Puc[]> {
    const query = { [by]: value };
    return await this.pucModel.find(query).exec();
  }
}
