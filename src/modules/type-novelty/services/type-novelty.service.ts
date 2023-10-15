import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TypeNovelty } from '../entities/type-novelty.entity';
import { Model } from 'mongoose';
import { CreateTypeNoveltyDto } from '../dto/create-type-novelty.dto';

@Injectable()
export class TypeNoveltyService {
  constructor(
    @InjectModel(TypeNovelty.name)
    private readonly typeNoveltyModel: Model<TypeNovelty>,
  ) {}

  async create(novelty: CreateTypeNoveltyDto): Promise<TypeNovelty> {
    const createdAdmin = new this.typeNoveltyModel(novelty);
    return await createdAdmin.save();
  }

  async findAll(): Promise<TypeNovelty[]> {
    return await this.typeNoveltyModel.find().exec();
  }

  async findOne(id: string): Promise<TypeNovelty> {
    return await this.typeNoveltyModel.findById(id).exec();
  }

  async findBy(by: string, value: string, key: string): Promise<TypeNovelty[]> {
    if (key) {
      const query = {
        [key]: {
          $elemMatch: {
            [by]: value,
          },
        },
      };
      return await this.typeNoveltyModel.find(query).exec();
    } else {
      const query = { [by]: value };
      return await this.typeNoveltyModel.find(query).exec();
    }
  }

  async delete(id: string): Promise<TypeNovelty> {
    return await this.typeNoveltyModel.findByIdAndDelete(id).exec();
  }
}
