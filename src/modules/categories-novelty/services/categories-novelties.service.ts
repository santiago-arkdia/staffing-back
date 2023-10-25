import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesNovelty } from '../entities/categories-novelties.entity';
import { Model } from 'mongoose';
import { CreateCategoriesNewsDto } from '../dto/create-categories-novelties.dto';

@Injectable()
export class CategoriesNewsService {
  constructor(
    @InjectModel(CategoriesNovelty.name)
    private readonly categoriesNewstModel: Model<CategoriesNovelty>,
  ) {}

  async create(
    categoriesNews: CreateCategoriesNewsDto,
  ): Promise<CategoriesNovelty> {
    const createdCategoriesNews = new this.categoriesNewstModel(categoriesNews);
    return await createdCategoriesNews.save();
  }

  async update(
    id: string,
    categoriesNews: CategoriesNovelty,
  ): Promise<CategoriesNovelty> {
    return await this.categoriesNewstModel.findByIdAndUpdate(
      id,
      categoriesNews,
    );
  }

  async findAll(): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewstModel.find().exec();
  }

  async findOne(id: string): Promise<CategoriesNovelty> {
    return await this.categoriesNewstModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<CategoriesNovelty[]> {
    const query = { [by]: value };
    return await this.categoriesNewstModel.find(query).exec();
  }
}
