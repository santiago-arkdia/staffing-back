import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesNews } from '../entities/categories-news.entity';
import { Model } from 'mongoose';
import { CreateCategoriesNewsDto } from '../dto/create-categories-news.dto';

@Injectable()
export class CategoriesNewsService {
  constructor(
    @InjectModel(CategoriesNews.name)
    private readonly categoriesNewstModel: Model<CategoriesNews>,
  ) {}

  async create(
    categoriesNews: CreateCategoriesNewsDto,
  ): Promise<CategoriesNews> {
    const createdCategoriesNews = new this.categoriesNewstModel(categoriesNews);
    return await createdCategoriesNews.save();
  }

  async update(
    id: string,
    categoriesNews: CategoriesNews,
  ): Promise<CategoriesNews> {
    return await this.categoriesNewstModel.findByIdAndUpdate(
      id,
      categoriesNews,
    );
  }

  async findAll(): Promise<CategoriesNews[]> {
    return await this.categoriesNewstModel.find().exec();
  }

  async findOne(id: string): Promise<CategoriesNews> {
    return await this.categoriesNewstModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<CategoriesNews[]> {
    const query = { [by]: value };
    return await this.categoriesNewstModel.find(query).exec();
  }
}
