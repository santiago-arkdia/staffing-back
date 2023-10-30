import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoveltySpreadsheet } from '../entities/spreadsheet-novelty.entity';
import { CreateSpreadsheetsDto } from '../dto/create-spreadsheet-novelty.dto';

@Injectable()
export class SpreadsheetNoveltyService {
  constructor(
    @InjectModel(NoveltySpreadsheet.name)
    private readonly noveltySpreadsheetModel: Model<NoveltySpreadsheet>,
  ) {}

  async create(novelty: CreateSpreadsheetsDto): Promise<NoveltySpreadsheet> {
    const createdAdmin = new this.noveltySpreadsheetModel(novelty);
    return await createdAdmin.save();
  }

  async findAll(): Promise<NoveltySpreadsheet[]> {
    return await this.noveltySpreadsheetModel.find().exec();
  }

  async findOne(id: string): Promise<NoveltySpreadsheet> {
    return await this.noveltySpreadsheetModel.findById(id).exec();
  }

  async delete(id: string): Promise<NoveltySpreadsheet> {
    return await this.noveltySpreadsheetModel.findByIdAndDelete(id).exec();
  }
}
