/* eslint-disable prettier/prettier */
import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesNewsService } from '../services/categories-novelties.service';
import { CreateCategoriesNewsDto } from '../dto/create-categories-novelties.dto';
import { CategoriesNovelty } from '../entities/categories-novelties.entity';

@ApiTags('Categories Novelties')
@Controller('api/categories-novelty')
export class CategoriesNewsController {
  constructor(private readonly categoriesNewsService: CategoriesNewsService) {}

  @Post()
  async create(@Body() categoriesNews: CreateCategoriesNewsDto): Promise<CategoriesNovelty> {
    return await this.categoriesNewsService.create(categoriesNews);
  }

  @Put(':id')
  async update( @Param('id') id: string, @Body() categoriesNews: CategoriesNovelty): Promise<CategoriesNovelty> {
    return await this.categoriesNewsService.update(id, categoriesNews);
  }

  @Get()
  async findAll(): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoriesNovelty> {
    return await this.categoriesNewsService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsService.findBy(by, value);
  }
}
