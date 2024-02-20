/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import { CategoriesNewsService } from '../services/categories-novelties.service';
import { CreateCategoriesNoveltiesDto } from '../dto/create-categories-novelties.dto';
import { CategoriesNovelty } from '../entities/categories-novelties.entity';
import { UpdateModuleParameterizationsDto } from '../dto/update-categories-novelties.dto';

@ApiTags('Categories Novelties')
@Controller('api/categories-novelty')
export class CategoriesNewsController {
  constructor(private readonly categoriesNewsService: CategoriesNewsService) {}

  @Post()
  async create(@Body() categoriesNews: CreateCategoriesNoveltiesDto): Promise<CategoriesNovelty> {
    return await this.categoriesNewsService.create(categoriesNews);
  }

  @Put(':id')
  async update( @Param('id') id: string, @Body() categoriesNews: UpdateModuleParameterizationsDto): Promise<CategoriesNovelty> {
    return await this.categoriesNewsService.update(id, categoriesNews);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas las categorias' })
  async findAll(): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsService.findAll();
  }


  @Get("type/:type")
  @ApiOperation({ summary: 'Lista todas las categorias por tipo de novedad' })
  async findAllForType(@Param('type') typeNovelty: string): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsService.findAllForType(typeNovelty);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Filtra una categoria por ID' })
  async findOne(@Param('id') id: string): Promise<CategoriesNovelty> {
    return await this.categoriesNewsService.findOne(id);
  }

  @Get(':type/:page/:limit/:by/:value')
  @ApiOperation({ summary: 'Filtra por valor (opcional) y paginacion' })
  async findBy(
      @Param('page') page: number,
      @Param('limit') limit: number,
      @Param('by') by: string,
      @Param('value') value: string,
      @Param('type') typeNovelty: string
  ): Promise<CategoriesNovelty[]> {
    return await this.categoriesNewsService.findBy(page, limit, by, value, typeNovelty);
  }
}
