import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Eps } from '../entities/eps.entity';
import { Model } from 'mongoose';
import { CreateEpsDto } from '../dto/create-eps.dto';
import { UpdateEpsDto } from '../dto/update-eps.dto';

@Injectable()
export class EpsService {
  constructor(@InjectModel(Eps.name) private readonly epsModel: Model<Eps>) {}

  async create(eps: CreateEpsDto): Promise<Eps> {
    const createdEps = new this.epsModel(eps);
    return await createdEps.save();
  }

  async update(id: string, eps: Eps): Promise<UpdateEpsDto> {
    return await this.epsModel.findByIdAndUpdate(id, eps, { new: true });
  }

  async findAll(): Promise<Eps[]> {
    return await this.epsModel.find().exec();
  }

  async findOne(id: string): Promise<Eps> {
    return await this.epsModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<Eps[]> {
    const query = { [by]: value };
    return await this.epsModel.find(query).exec();
  }
}
