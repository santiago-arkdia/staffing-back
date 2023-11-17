import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnlineContributions } from '../entities/online-contributions.entity';
import { CreateOnlineContributionDto } from '../dto/create-online-contribution.dto';

@Injectable()
export class OnlineContributionsService {
  constructor(
    @InjectModel(OnlineContributions.name)
    private readonly onlineContributionModel: Model<OnlineContributions>,
  ) {}

  async create(
    onlineContribution: CreateOnlineContributionDto,
  ): Promise<OnlineContributions> {
    const createdonlineContribution = new this.onlineContributionModel(
      onlineContribution,
    );
    return await createdonlineContribution.save();
  }

  async update(
    id: string,
    onlineContribution: OnlineContributions,
  ): Promise<OnlineContributions> {
    return this.onlineContributionModel.findByIdAndUpdate(
      id,
      onlineContribution,
    );
  }

  async findAll(): Promise<OnlineContributions[]> {
    return await this.onlineContributionModel.find().exec();
  }

  async findOne(id: string): Promise<OnlineContributions> {
    return await this.onlineContributionModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<OnlineContributions[]> {
    const query = { [by]: value };
    return await this.onlineContributionModel.find(query).exec();
  }
}
