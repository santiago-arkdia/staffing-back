import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUtilityCenterDto } from '../dto/utility-center-costs.dto';
import { UtilityCenter } from '../entities/utility-center.entity';

@Injectable()
export class UtilityCenterService {
  constructor(@InjectModel(UtilityCenter.name) private readonly utilityCenterModel: Model<UtilityCenter>) {}

  async create(utilityCenter: CreateUtilityCenterDto): Promise<UtilityCenter> {
    const createdUtilityCenter = new this.utilityCenterModel(utilityCenter);
    return await createdUtilityCenter.save();
  }

  async update(id: string, utilityCenter: UtilityCenter): Promise<UtilityCenter> {
    return await this.utilityCenterModel.findByIdAndUpdate(id, utilityCenter, { new: true });
  }

  async findAll(): Promise<UtilityCenter[]> {
    return await this.utilityCenterModel.find().exec();
  }

  async findOne(id: string): Promise<UtilityCenter> {
    return await this.utilityCenterModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<UtilityCenter[]> {
    const query = { [by]: value };
    return await this.utilityCenterModel.find(query).exec();
  }
}
