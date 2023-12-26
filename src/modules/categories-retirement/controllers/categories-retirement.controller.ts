/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import { CategoriesRetirementService } from '../services/categories-retirement.service';
import { CreateCategoriesNoveltiesDto } from '../dto/create-categories-retirement.dto';
import { CategoriesRetirement } from '../entities/categories-retirement.entity';
import { UpdateModuleParameterizationsDto } from '../dto/update-categories-retirement.dto';

@ApiTags('Categories Retirement')
@Controller('api/categories-retirement')
export class CategoriesRetirementController {
  constructor(private readonly categoriesNewsService: CategoriesRetirementService) {}

  @Post()
  async create(@Body() categoriesNews: CreateCategoriesNoveltiesDto): Promise<CategoriesRetirement> {
    return await this.categoriesNewsService.create(categoriesNews);
  }

  @Put(':id')
  async update( @Param('id') id: string, @Body() categoriesNews: UpdateModuleParameterizationsDto): Promise<CategoriesRetirement> {
    return await this.categoriesNewsService.update(id, categoriesNews);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas las categorias' })
  async findAll(): Promise<CategoriesRetirement[]> {
    return await this.categoriesNewsService.findAll();
  }


  @Get(':id')
  @ApiOperation({ summary: 'Filtra una categoria por ID' })
  async findOne(@Param('id') id: string): Promise<CategoriesRetirement> {
    return await this.categoriesNewsService.findOne(id);
  }

  @Get(':page/:limit/:by/:value')
  @ApiOperation({ summary: 'Filtra por valor (opcional) y paginacion' })
  async findBy(
      @Param('page') page: number,
      @Param('limit') limit: number,
      @Param('by') by: string,
      @Param('value') value: string,
  ): Promise<CategoriesRetirement[]> {
    return await this.categoriesNewsService.findBy(page, limit, by, value);
  }
}
