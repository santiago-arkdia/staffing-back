/* eslint-disable prettier/prettier */
import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import { CategoriesNewsService } from '../services/categories-novelties.service';
import { CreateCategoriesNewsDto } from '../dto/create-categories-novelties.dto';
import { CategoriesNovelty } from '../entities/categories-novelties.entity';
import {Types} from "mongoose";

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
  @ApiOperation({ summary: 'Lista todas las categorias' })
  async findAll(): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsService.findAll();
  }
  @Get()
  @ApiOperation({ summary: 'Lista todos los agrupadores de categoria' })
  async findAllTypes(): Promise<{ name: string; _id: Types.ObjectId }[]> {
    return await this.categoriesNewsService.findAllTypes();
  }
  @Get(':name')
  @ApiOperation({ summary: 'Filtra las categorias del agrupador seleccionado' })
  async findConcepts(@Param('name') name: any): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsService.findAllConcepts(name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Filtra una categoria por ID' })
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
