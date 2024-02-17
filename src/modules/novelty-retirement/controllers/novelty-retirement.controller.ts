/* eslint-disable prettier/prettier */
import {ApiBody, ApiOperation, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {CreateNoveltyRetirementDto} from '../dto/create-novelty-retirement.dto';
import {UpdateConceptsRetirementDto} from '../dto/update-novelty-retirement.dto';
import {AuthGuard} from "../../auth/auth.guard";
import { Request } from 'express';
import { NoveltyRetirement } from '../entities/novelty-retirement.entity';
import { NoveltyRetirementService } from '../services/novelty-retirement.service';

@ApiTags('Novelty-Retirement')
@Controller('api/novelty-retirement')
export class NoveltyRetirementController {
  constructor(private readonly noveltyRetirementService: NoveltyRetirementService) {}

  @Post()
  @ApiOperation({ summary: 'Crear reporte de novedad' })
  // @UseGuards(AuthGuard)
  async create(@Body() novelty: CreateNoveltyRetirementDto): Promise<NoveltyRetirement> {
    return await this.noveltyRetirementService.create(novelty);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar novedad' })
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateNoveltyDto: UpdateConceptsRetirementDto,
  ): Promise<UpdateConceptsRetirementDto> {
    return await this.noveltyRetirementService.update(id, updateNoveltyDto);
  }

  @Get('find-by-signed-manager/:page/:limit')
  @ApiOperation({ summary: 'Filtrar novedad por ID' })
  @UseGuards(AuthGuard)
  async findBySignedByManager( @Param('page') page: number,  @Param('limit') limit: number, @Req() request: Request): Promise<NoveltyRetirement[]> {
    const { roleKey } = request['user'];
    return await this.noveltyRetirementService.findBySignedByManager(page, limit, roleKey);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Filtrar novedad por ID' })
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<NoveltyRetirement> {
    return await this.noveltyRetirementService.findOne(id);
  }


  @Post(':page/:limit/:by/:value')
  @ApiOperation({ summary: 'Filtrar novedades por valor y paginación' })
  @UseGuards(AuthGuard)
  async findBy(
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Param('by') by: string,
    @Param('value') value: string,
    @Body() requestBody: Record<string, any>,
    @Req() request: Request
  ): Promise<NoveltyRetirement[]> {
    const { roleKey } = request['user'];
    return await this.noveltyRetirementService.findBy(page, limit, by, value, requestBody, roleKey, request['user'].userAdmin);
  }

}
