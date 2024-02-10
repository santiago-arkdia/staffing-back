/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import { CategoriesSocialSecurityService } from '../services/categories-social-security.service';
import { CategoriesSocialSecurity } from '../entities/categories-social-security.entity';
import { UpdateModuleParameterizationsDto } from '../dto/update-categories-social-security.dto';
import { CreateCategoriesNoveltiesSocialSecurityDto } from '../dto/create-categories-social-security.dto';

@ApiTags('Categories Social Security')
@Controller('api/categories-social-security')
export class CategoriesSocialSecurityController {
  constructor(private readonly categoriesNewsService: CategoriesSocialSecurityService) {}

  @Post()
  async create(@Body() categoriesNews: CreateCategoriesNoveltiesSocialSecurityDto): Promise<CategoriesSocialSecurity> {
    return await this.categoriesNewsService.create(categoriesNews);
  }

  @Put(':id')
  async update( @Param('id') id: string, @Body() categoriesNews: UpdateModuleParameterizationsDto): Promise<CategoriesSocialSecurity> {
    return await this.categoriesNewsService.update(id, categoriesNews);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas las categorias' })
  async findAll(): Promise<CategoriesSocialSecurity[]> {
    return await this.categoriesNewsService.findAll();
  }


  @Get(':id') 
  @ApiOperation({ summary: 'Filtra una categoria por ID' })
  async findOne(@Param('id') id: string): Promise<CategoriesSocialSecurity> {
    return await this.categoriesNewsService.findOne(id);
  }

  @Get(':page/:limit/:by/:value')
  @ApiOperation({ summary: 'Filtra por valor (opcional) y paginacion' })
  async findBy(
      @Param('page') page: number,
      @Param('limit') limit: number,
      @Param('by') by: string,
      @Param('value') value: string,
  ): Promise<CategoriesSocialSecurity[]> {
    return await this.categoriesNewsService.findBy(page, limit, by, value);
  }
}
