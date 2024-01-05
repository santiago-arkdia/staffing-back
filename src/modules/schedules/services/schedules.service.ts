import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedules } from '../entities/schedules.entity';
import { CreateSchedulesDto } from '../dto/create-schedules.dto';
import { UpdateSchedulesDto } from '../dto/update-schedules.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedules.name) private readonly schedulesModel: Model<Schedules>,
  ) {}

  async create(schedules: CreateSchedulesDto[]): Promise<Schedules[]> {
    return await this.schedulesModel.insertMany(schedules);
  }

  async update(id: string, schedules: UpdateSchedulesDto): Promise<Schedules> {
    return await this.schedulesModel.findByIdAndUpdate(id, schedules, { new: true });
  }

  async findAll(): Promise<Schedules[]> {
    return await this.schedulesModel.find().exec();
  }

  async findOne(id: any): Promise<Schedules> {
    return await this.schedulesModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<Schedules[]> {
    const query = { [by]: value };
    return await this.schedulesModel.find(query).exec();
  }
}
