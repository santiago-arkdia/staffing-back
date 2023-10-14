import { Injectable } from '@nestjs/common';
import { NoveltyState } from '../entities/novelty-state.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoveltyStateDto } from '../dto/create-state-novelty.dto';

@Injectable()
export class StateNoveltyService {
  constructor(
    @InjectModel(NoveltyState.name)
    private readonly noveltyStateModel: Model<NoveltyState>,
  ) {}

  async create(novelty: CreateNoveltyStateDto): Promise<NoveltyState> {
    const createdAdmin = new this.noveltyStateModel(novelty);
    return await createdAdmin.save();
  }

  async findAll(): Promise<NoveltyState[]> {
    return await this.noveltyStateModel.find().exec();
  }

  async findOne(id: string): Promise<NoveltyState> {
    return await this.noveltyStateModel.findById(id).exec();
  }

  async findBy(
    by: string,
    value: string,
    key: string,
  ): Promise<NoveltyState[]> {
    if (key) {
      const query = {
        [key]: {
          $elemMatch: {
            [by]: value,
          },
        },
      };
      return await this.noveltyStateModel.find(query).exec();
    } else {
      const query = { [by]: value };
      return await this.noveltyStateModel.find(query).exec();
    }
  }

  async delete(id: string): Promise<NoveltyState> {
    return await this.noveltyStateModel.findByIdAndDelete(id).exec();
  }
}
