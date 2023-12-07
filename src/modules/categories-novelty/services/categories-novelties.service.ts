/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {CategoriesNovelty} from '../entities/categories-novelties.entity';
import {Model, Types} from 'mongoose';
import {CreateCategoriesNewsDto} from '../dto/create-categories-novelties.dto';

@Injectable()
export class CategoriesNewsService {
  constructor(
    @InjectModel(CategoriesNovelty.name)
    private readonly categoriesNewsModel: Model<CategoriesNovelty>,
  ) {}

  async create(
    categoriesNews: CreateCategoriesNewsDto,
  ): Promise<CategoriesNovelty> {
    const createdCategoriesNews = new this.categoriesNewsModel(categoriesNews);
    return await createdCategoriesNews.save();
  }

  async update(
    id: string,
    categoriesNews: CategoriesNovelty,
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

  async findAllTypes(): Promise<{ type: string; _id: Types.ObjectId }[]> {
    const categories = await this.categoriesNewsModel.find().select('type _id').lean().exec();

    const uniqueTypesSet = new Set<string>();
    const uniqueCategories = categories.filter(category => {
      const type = category.type;
      if (!uniqueTypesSet.has(type)) {
        uniqueTypesSet.add(type);
        return true;
      }
      return false;
    });

    return uniqueCategories.map(category => ({ type: category.type, _id: category._id }));
  }

  async findAllConcepts(body: Record<string, any> = {}): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsModel.find(body).select('_id name code manages').exec();
  }

  async findBy(
      page: number,
      limit: number,
      by: string,
      value: string | number,
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
        ? await this.categoriesNewsModel.countDocuments().exec()
        : await this.categoriesNewsModel.countDocuments(query).exec();
    const totalPages = Math.ceil(total / limit);

    let search;

    if (by === 'find' && value === 'all') {
      search = this.categoriesNewsModel
          .find()
          .skip((page - 1) * limit)
          .limit(limit)
          .exec();
    } else {
      search = this.categoriesNewsModel
          .find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .exec();
    }

    const data = await search;

    const categories: any = {};
    categories.total = total;
    categories.pages = totalPages;
    categories.data = data;

    return categories;
  }
}
