import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Arl } from '../entities/arl.entity';
import { Model } from 'mongoose';
import { CreateArlDto } from '../dto/create-arl.dto';
import { UpdateArlDto } from '../dto/update-arl.dto';

@Injectable()
export class ArlService {
  constructor(@InjectModel(Arl.name) private readonly arlModel: Model<Arl>) {}

  async create(arl: CreateArlDto): Promise<Arl> {
    const createdArl = new this.arlModel(arl);
    return await createdArl.save();
  }

  async update(id: string, arl: Arl): Promise<UpdateArlDto> {
    return await this.arlModel.findByIdAndUpdate(id, arl, { new: true });
  }

  async findAll(): Promise<Arl[]> {
    return await this.arlModel.find().exec();
  }

  async findOne(id: string): Promise<Arl> {
    return await this.arlModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<Arl[]> {
    const query = { [by]: value };
    return await this.arlModel.find(query).exec();
  }
}
