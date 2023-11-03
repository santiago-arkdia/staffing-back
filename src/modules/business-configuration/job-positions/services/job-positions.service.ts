import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobPositionsDto } from '../dto/job-positions.dto';
import { JobPositions } from '../entities/job-positions.entity';

@Injectable()
export class JobPositionsService {
  constructor(
    @InjectModel(JobPositions.name)
    private readonly jobPositionsModel: Model<JobPositions>,
  ) {}

  async create(jobPositions: CreateJobPositionsDto): Promise<JobPositions> {
    const createdJobPositions = new this.jobPositionsModel(jobPositions);
    return await createdJobPositions.save();
  }

  async update(id: string, jobPositions: JobPositions): Promise<JobPositions> {
    return await this.jobPositionsModel.findByIdAndUpdate(id, jobPositions, {
      new: true,
    });
  }

  async findAll(page: number, limit: number): Promise<JobPositions[]> {
    const total = await this.jobPositionsModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit);

    const jobPosition = await this.jobPositionsModel
      .find()
      .skip((page - 1) * limit)
      .populate(['utilityCenter', 'region', 'centersCosts', 'arl'])
      .limit(limit)
      .exec();

    const jobPositions: any = {};
    jobPositions.total = total;
    jobPositions.pages = totalPages;
    jobPositions.data = jobPosition;

    return jobPositions;
  }

  async findOne(id: string): Promise<JobPositions> {
    return await this.jobPositionsModel.findById(id).exec();
  }

  async findBy(
    page: number,
    limit: number,
    by: string,
    value: string,
  ): Promise<JobPositions[]> {
    const query = { [by]: { $regex: new RegExp(value, 'i') } };

    const total = await this.jobPositionsModel.countDocuments(query).exec();
    const totalPages = Math.ceil(total / limit);

    const jobPosition = await this.jobPositionsModel
      .find(query)
      .skip((page - 1) * limit)
      .populate(['utilityCenter', 'region', 'centersCosts', 'arl'])
      .limit(limit)
      .exec();

    const jobPositions: any = {};
    jobPositions.total = total;
    jobPositions.pages = totalPages;
    jobPositions.data = jobPosition;

    return jobPositions;
  }
}
