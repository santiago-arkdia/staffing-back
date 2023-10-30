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

  async findAll(page: number, limit: number): Promise<Region[]> {
    const total = await this.regionModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit)

    const region = await this.regionModel
      .find()
      .skip((page - 1) * limit)
      .populate('country')
      .limit(limit)
      .exec();

      let regions: any = {};
      regions.total = total;
      regions.pages = totalPages;
      regions.data = region;

      return regions;
  }

  async findOne(id: string): Promise<Region> {
    return await this.regionModel.findById(id).exec();
  }

  async findBy(page: number, limit: number, by: string, value: string): Promise<Region[]> {
    const query = { [by]: value };

    const total = await this.regionModel.countDocuments(query).exec();
    const totalPages = Math.ceil(total / limit)

    const region = await this.regionModel
      .find(query)
      .skip((page - 1) * limit)
      .populate('country')
      .limit(limit)
      .exec();

      let regions: any = {};
      regions.total = total;
      regions.pages = totalPages;
      regions.data = region;

      return regions;
  }
}
