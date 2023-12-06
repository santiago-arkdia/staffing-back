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
  @Get()
  async findAllTypes(): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsService.findAllTypes();
  }
  @Get(':name')
  async findConcepts(@Param('name') name: any): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsService.findAllConcepts(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<CategoriesNovelty> {
    return await this.categoriesNewsService.findOne(id);
  }

  @Get(':page/:limit/:by/:value')
  async findBy(
      @Param('page') page: number,
      @Param('limit') limit: number,
      @Param('by') by: string,
      @Param('value') value: string,
  ): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsService.findBy(page, limit, by, value);
  }
}
