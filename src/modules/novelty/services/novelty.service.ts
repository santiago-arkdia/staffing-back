/* eslint-disable prettier/prettier */
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

  async update(id: string, updateNoveltyDto: UpdateNoveltyDto): Promise<UpdateNoveltyDto> {
    if (
      updateNoveltyDto.initialDate &&
      !isNaN(Date.parse(updateNoveltyDto.initialDate.toString()))
    ) {
      updateNoveltyDto.initialDate = new Date(updateNoveltyDto.initialDate);
    } else {
      delete updateNoveltyDto.initialDate; 
    }

    if (
      updateNoveltyDto.finalDate &&
      !isNaN(Date.parse(updateNoveltyDto.finalDate.toString()))
    ) {
      updateNoveltyDto.finalDate = new Date(updateNoveltyDto.finalDate);
    } else {
      delete updateNoveltyDto.finalDate; 
    }

    const updatedNovelty = await this.noveltyModel.findByIdAndUpdate(
      id,
      updateNoveltyDto,
      {
        new: true
      },
    );

    if (!updatedNovelty) {
      throw new NotFoundException('Novedad no encontrada');
    }

    return null;
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

  async remove(id: string): Promise<void> {
    const deletedNovelty = await this.noveltyModel.findByIdAndDelete(id);

    if (!deletedNovelty) {
      throw new NotFoundException('Novedad no encontrada');
    }
  }
}
