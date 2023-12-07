/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiTags} from '@nestjs/swagger';
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

  @Get('list-types')
  @ApiOperation({ summary: 'AGRUPADORES' })
  async findAllTypes(): Promise<{ type: string; _id: Types.ObjectId }[]> {
    return await this.categoriesNewsService.findAllTypes();
  }

  @Post('concepts-by-type')
  @ApiOperation({ summary: 'Filtrar por AGRUPADOR' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        type: { type: 'string' },
      },
    },
  })
  async findConcepts(@Body() body: Record<string, any> = {}): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsService.findAllConcepts(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Filtra una categoria por ID' })
  async findOne(@Param('id') id: string): Promise<CategoriesNovelty> {
    return await this.categoriesNewsService.findOne(id);
  }

  @Get(':page/:limit/:by/:value')
  @ApiOperation({ summary: 'Filtra por valor (opcional) y paginacion' })
  async findBy(
      @Param('page') page: number,
      @Param('limit') limit: number,
      @Param('by') by: string,
      @Param('value') value: string,
  ): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsService.findBy(page, limit, by, value);
  }
}
