import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobPositionsDto } from '../dto/job-positions.dto';
import { JobPositions } from '../entities/job-positions.entity';

@Injectable()
export class JobPositionsService {
  constructor(@InjectModel(JobPositions.name) private readonly jobPositionsModel: Model<JobPositions>) {}

  async create(jobPositions: CreateJobPositionsDto): Promise<JobPositions> {
    const createdJobPositions = new this.jobPositionsModel(jobPositions);
    return await createdJobPositions.save();
  }

  async update(id: string, jobPositions: JobPositions): Promise<JobPositions> {
    return await this.jobPositionsModel.findByIdAndUpdate(id, jobPositions, { new: true });
  }

  async findAll(): Promise<JobPositions[]> {
    return await this.jobPositionsModel.find().exec();
  }

  async findOne(id: string): Promise<JobPositions> {
    return await this.jobPositionsModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<JobPositions[]> {
    const query = { [by]: value };
    return await this.jobPositionsModel.find(query).exec();
  }
}
