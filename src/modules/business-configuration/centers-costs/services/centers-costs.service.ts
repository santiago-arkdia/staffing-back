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

  async findAll(page: number, limit: number): Promise<CentersCosts[]> {

    const total = await this.centersCostsModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit)

    const centersCost = await this.centersCostsModel
      .find()
      .skip((page - 1) * limit)
      .populate('region')
      .limit(limit)
      .exec();

      let centersCosts: any = {};
      centersCosts.total = total;
      centersCosts.pages = totalPages;
      centersCosts.data = centersCost;

      return centersCosts;
  }

  async findOne(id: string): Promise<CentersCosts> {
    return await this.centersCostsModel.findById(id).exec();
  }

  async findBy(page: number, limit: number, by: string, value: string): Promise<CentersCosts[]> {
    const query = { [by]: value };

    const total = await this.centersCostsModel.countDocuments(query).exec();
    const totalPages = Math.ceil(total / limit)

    const centersCost = await this.centersCostsModel
      .find(query)
      .skip((page - 1) * limit)
      .populate('region')
      .limit(limit)
      .exec();

      let centersCosts: any = {};
      centersCosts.total = total;
      centersCosts.pages = totalPages;
      centersCosts.data = centersCost;

      return centersCosts;
  }
}
