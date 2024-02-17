/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {CategoriesNovelty} from '../entities/categories-novelties.entity';
import {Model, Types} from 'mongoose';
import {CreateCategoriesNoveltiesDto} from '../dto/create-categories-novelties.dto';
import { UpdateModuleParameterizationsDto } from '../dto/update-categories-novelties.dto';

@Injectable()
export class CategoriesNewsService {
  constructor(
    @InjectModel(CategoriesNovelty.name)
    private readonly categoriesNewsModel: Model<CategoriesNovelty>,
  ) {}

  async create(
    categoriesNews: CreateCategoriesNoveltiesDto,
  ): Promise<CategoriesNovelty> {
    const createdCategoriesNews = new this.categoriesNewsModel(categoriesNews);
    return await createdCategoriesNews.save();
  }

  async update(
    id: string,
    categoriesNews: UpdateModuleParameterizationsDto,
  ): Promise<CategoriesNovelty> {
    return this.categoriesNewsModel.findByIdAndUpdate(
        id,
        categoriesNews,
    );
  }

  async findAll(): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsModel.find().exec();
  }

  async findOne(id: any): Promise<CategoriesNovelty> {
    return await this.categoriesNewsModel.findById(id).exec();
  }
  async findBy(
      page: number,
      limit: number,
      by: string,
      value: string | number,
      typeNovelty: string
  ): Promise<CategoriesNovelty[]> {
    let query = {};

    if (by !== 'find' && value !== 'all') {
      if (typeof value === 'string' && !isNaN(Number(value))) {
        query = { [by]: Number(value) };
      } else if (typeof value === 'string') {
        if (Types.ObjectId.isValid(value)) {
          query = { [by]: value };
        } else {
          query = { [by]: { $regex: new RegExp(value, 'i') } };
        }
      } else if (typeof value === 'number') {
        query = { [by]: value };
      }
    }

    const total = by === 'find' && value === 'all'
        ? await this.categoriesNewsModel.countDocuments({typeNovelty: typeNovelty}).exec()
        : await this.categoriesNewsModel.countDocuments({typeNovelty: typeNovelty},query).exec();
    const totalPages = Math.ceil(total / limit);

    let queryBuilder

    if (by === 'find' && value === 'all') {
      queryBuilder = this.categoriesNewsModel.find({typeNovelty: typeNovelty}).select("type").select("typeNovelty");
    }else{
      queryBuilder = this.categoriesNewsModel.find({typeNovelty: typeNovelty}, query).select("type").select("typeNovelty");
    }

    if (page > 0 && limit > 0) {
      queryBuilder = queryBuilder.skip((page - 1) * limit).limit(limit);
    }

    const data = await queryBuilder.exec();

    const categories: any = {};
    categories.total = total;
    categories.pages = totalPages;
    categories.data = data;

    return categories;
  }
}
