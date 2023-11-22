import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUtilityCenterDto } from '../dto/utility-center-costs.dto';
import { UtilityCenters } from '../entities/utility-center.entity';

@Injectable()
export class UtilityCenterService {
  constructor(
    @InjectModel(UtilityCenters.name)
    private readonly utilityCenterModel: Model<UtilityCenters>,
  ) {}

  async create(utilityCenter: CreateUtilityCenterDto): Promise<UtilityCenters> {
    const createdUtilityCenter = new this.utilityCenterModel(utilityCenter);
    return await createdUtilityCenter.save();
  }

  async update(
    id: string,
    utilityCenter: UtilityCenters,
  ): Promise<UtilityCenters> {
    return this.utilityCenterModel.findByIdAndUpdate(id, utilityCenter, {
      new: true,
    });
  }

  async findAll(): Promise<UtilityCenters[]> {
    const total = await this.utilityCenterModel.countDocuments().exec();
    const utilityCenter = await this.utilityCenterModel
      .find()
      .populate({
        path: 'region',
        populate: {
          path: 'country',
        },
      })
      .exec();

    const utilityCenters: any = {};
    utilityCenters.total = total;
    utilityCenters.data = utilityCenter;

    return utilityCenters;
  }

  async findOne(id: string): Promise<UtilityCenters> {
    return await this.utilityCenterModel.findById(id).exec();
  }

  async findBy(
    page: number,
    limit: number,
    by: string,
    value: string | number,
  ): Promise<UtilityCenters[]> {
    let query = {};

    if (by !== 'find' && value !== 'all') {
      if (typeof value === 'string' && !isNaN(Number(value))) {
        query = { [by]: Number(value) };
      } else if (typeof value === 'string') {
        if (Types.ObjectId.isValid(value)) {
          query = { [by]: value };
        } else {
          query = { [by]: { $regex: new RegExp(value, 'i') } };
        }
      } else if (typeof value === 'number') {
        query = { [by]: value };
      }
    }

    const total =
      by === 'find' && value === 'all'
        ? await this.utilityCenterModel.countDocuments().exec()
        : await this.utilityCenterModel.countDocuments(query).exec();
    const totalPages = Math.ceil(total / limit);

    let search;
    if (by === 'find' && value === 'all') {
      search = await this.utilityCenterModel
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
    } else {
      search = await this.utilityCenterModel
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
    }

    const data = search;
    const regions: any = {};
    regions.total = total;
    regions.pages = totalPages;
    regions.data = data;

    return regions;
  }
}
