import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Region } from '../entities/region.entity';
import { CreateRegionDto } from '../dto/create-region.dto';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region.name) private readonly regionModel: Model<Region>) {}

  async create(region: CreateRegionDto): Promise<Region> {
    const createdRegion = new this.regionModel(region);
    return await createdRegion.save();
  }

  async update(id: string, region: Region): Promise<Region> {
    return await this.regionModel.findByIdAndUpdate(id, region, { new: true });
  }

  async findAll(): Promise<Region[]> {
    return await this.regionModel.find().exec();
  }

  async findOne(id: string): Promise<Region> {
    return await this.regionModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<Region[]> {
    const query = { [by]: value };
    return await this.regionModel.find(query).exec();
  }
}
