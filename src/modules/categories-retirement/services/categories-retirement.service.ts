/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {CategoriesRetirement} from '../entities/categories-retirement.entity';
import {Model, Types} from 'mongoose';
import {CreateCategoriesNoveltiesDto} from '../dto/create-categories-retirement.dto';
import { UpdateModuleParameterizationsDto } from '../dto/update-categories-retirement.dto';

@Injectable()
export class CategoriesRetirementService {
  constructor(
    @InjectModel(CategoriesRetirement.name)
    private readonly categoriesNewsModel: Model<CategoriesRetirement>,
  ) {}

  async create(
    categoriesNews: CreateCategoriesNoveltiesDto,
  ): Promise<CategoriesRetirement> {
    const createdCategoriesRetirement = new this.categoriesNewsModel(categoriesNews);
    return await createdCategoriesRetirement.save();
  }

  async update(
    id: string,
    categoriesNews: UpdateModuleParameterizationsDto,
  ): Promise<CategoriesRetirement> {
    return this.categoriesNewsModel.findByIdAndUpdate(
        id,
        categoriesNews,
    );
  }

  async findAll(): Promise<CategoriesRetirement[]> {
    return await this.categoriesNewsModel.find().exec();
  }

  async findOne(id: any): Promise<CategoriesRetirement> {
    return await this.categoriesNewsModel.findById(id).exec();
  }
  async findBy(
      page: number,
      limit: number,
      by: string,
      value: string | number,
  ): Promise<CategoriesRetirement[]> {
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
        ? await this.categoriesNewsModel.countDocuments().exec()
        : await this.categoriesNewsModel.countDocuments(query).exec();
    const totalPages = Math.ceil(total / limit);

    let queryBuilder

    if (by === 'find' && value === 'all') {
      queryBuilder = this.categoriesNewsModel.find();
    }else{
      queryBuilder = this.categoriesNewsModel.find(query);
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
