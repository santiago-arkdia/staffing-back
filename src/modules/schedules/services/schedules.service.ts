import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedules } from '../entities/schedules.entity';
import { CreateSchedulesDto } from '../dto/create-schedules.dto';
import { UpdateSchedulesDto } from '../dto/update-schedules.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedules.name) private readonly rolesModel: Model<Schedules>,
  ) {}

  async create(roles: CreateSchedulesDto): Promise<Schedules> {
    const createdSchedules = new this.rolesModel(roles);
    return await createdSchedules.save();
  }

  async update(id: string, roles: UpdateSchedulesDto): Promise<Schedules> {
    return await this.rolesModel.findByIdAndUpdate(id, roles, { new: true });
  }

  async findAll(): Promise<Schedules[]> {
    return await this.rolesModel.find().exec();
  }

  async findOne(id: any): Promise<Schedules> {
    return await this.rolesModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<Schedules[]> {
    const query = { [by]: value };
    return await this.rolesModel.find(query).exec();
  }
}
