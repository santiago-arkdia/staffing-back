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

  async findAll(page: number, limit: number): Promise<UtilityCenter[]> {
    const total = await this.utilityCenterModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit)

    const utilityCenter = await this.utilityCenterModel
      .find()
      .skip((page - 1) * limit)
      .populate({
        path: 'region',
        populate: {
          path: 'country',
        },
      })
      .limit(limit)
      .exec();

      let utilityCenters: any = {};
      utilityCenters.total = total;
      utilityCenters.pages = totalPages;
      utilityCenters.data = utilityCenter;

      return utilityCenters;
  }

  async findOne(id: string): Promise<UtilityCenter> {
    return await this.utilityCenterModel.findById(id).exec();
  }

  async findBy(page: number, limit: number, by: string, value: string): Promise<UtilityCenter[]> {
    const query = { [by]: value };

    const total = await this.utilityCenterModel.countDocuments(query).exec();
    const totalPages = Math.ceil(total / limit)

    const utilityCenter = await this.utilityCenterModel
      .find(query)
      .skip((page - 1) * limit)
      .populate({
        path: 'region',
        populate: {
          path: 'country',
        },
      })
      .limit(limit)
      .exec();

      let utilityCenters: any = {};
      utilityCenters.total = total;
      utilityCenters.pages = totalPages;
      utilityCenters.data = utilityCenter;

      return utilityCenters;
  }
}
