import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesNewsService } from '../services/categories-news.service';
import { CreateCategoriesNewsDto } from '../dto/create-categories-news.dto';
import { CategoriesNews } from '../entities/categories-news.entity';

@ApiTags('Categories News')
@Controller('api/categories-news')
export class CategoriesNewsController {
  constructor(private readonly categoriesNewsService: CategoriesNewsService) {}

  @Post()
  async create(
    @Body() categoriesNews: CreateCategoriesNewsDto,
  ): Promise<CategoriesNews> {
    return await this.categoriesNewsService.create(categoriesNews);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() categoriesNews: CategoriesNews,
  ): Promise<CategoriesNews> {
    return await this.categoriesNewsService.update(id, categoriesNews);
  }

  @Get()
  async findAll(): Promise<CategoriesNews[]> {
    return await this.categoriesNewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoriesNews> {
    return await this.categoriesNewsService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(
    @Param('by') by: string,
    @Param('value') value: string,
  ): Promise<CategoriesNews[]> {
    return await this.categoriesNewsService.findBy(by, value);
  }
}
