import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Novelty } from '../entities/novelty.entity';
import { CreateNoveltyDto } from '../dto/create-novelty.dto';
import { UpdateNoveltyDto } from '../dto/update-novelty.dto';

@Injectable()
export class NoveltyService {
  constructor(
    @InjectModel(Novelty.name)
    private readonly noveltyModel: Model<Novelty>,
  ) {}

  async create(novelty: CreateNoveltyDto): Promise<Novelty> {
    const createdNovelty = new this.noveltyModel(novelty);
    return await createdNovelty.save();
  }

  async update(
    id: string,
    updateNoveltyDto: UpdateNoveltyDto,
  ): Promise<Novelty> {
    const existingNovelty = await this.noveltyModel.findById(id);
    if (!existingNovelty) {
      throw new NotFoundException('Novedad no encontrada');
    }
    Object.assign(existingNovelty, updateNoveltyDto);
    return await existingNovelty.save();
  }

  async findAll(): Promise<Novelty[]> {
    return await this.noveltyModel.find().exec();
  }

  async findOne(id: string): Promise<Novelty> {
    return await this.noveltyModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<Novelty[]> {
    const query = { [by]: value };
    return await this.noveltyModel.find(query).exec();
  }
}
