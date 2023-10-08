import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCentersCostsDto } from '../dto/create-centers-costs.dto';
import { CentersCosts } from '../entities/centers-costs.entity';

@Injectable()
export class CentersCostsService {
  constructor(@InjectModel(CentersCosts.name) private readonly centersCostsModel: Model<CentersCosts>) {}

  async create(centersCosts: CreateCentersCostsDto): Promise<CentersCosts> {
    const createdCentersCosts = new this.centersCostsModel(centersCosts);
    return await createdCentersCosts.save();
  }

  async update(id: string, centersCosts: CentersCosts): Promise<CentersCosts> {
    return await this.centersCostsModel.findByIdAndUpdate(id, centersCosts, { new: true });
  }

  async findAll(): Promise<CentersCosts[]> {
    return await this.centersCostsModel.find().exec();
  }

  async findOne(id: string): Promise<CentersCosts> {
    return await this.centersCostsModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<CentersCosts[]> {
    const query = { [by]: value };
    return await this.centersCostsModel.find(query).exec();
  }
}
