import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HourlyMeshes } from '../entities/hourly-meshes.entity';
import { CreateHourlyMeshesDto } from '../dto/create-hourly-meshes.dto';
import { UpdateHourlyMeshesDto } from '../dto/update-hourly-meshes.dto';

@Injectable()
export class HourlyMeshesService {
  constructor(
    @InjectModel(HourlyMeshes.name) private readonly rolesModel: Model<HourlyMeshes>,
  ) {}

  async create(roles: CreateHourlyMeshesDto): Promise<HourlyMeshes> {
    const createdHourlyMeshes = new this.rolesModel(roles);
    return await createdHourlyMeshes.save();
  }

  async update(id: string, roles: UpdateHourlyMeshesDto): Promise<HourlyMeshes> {
    return await this.rolesModel.findByIdAndUpdate(id, roles, { new: true });
  }

  async findAll(): Promise<HourlyMeshes[]> {
    return await this.rolesModel.find()
          .populate("schedules")
          .populate("jobPositions")
          .exec();
  }

  async findOne(id: any): Promise<HourlyMeshes> {
    return await this.rolesModel.findById(id)
          .populate("schedules")
          .populate("jobPositions")
          .exec();
  }

  async findBy(by: string, value: string): Promise<HourlyMeshes[]> {
    const query = { [by]: value };
    return await this.rolesModel.find(query).exec();
  }
}
