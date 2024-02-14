/* eslint-disable prettier/prettier */
import {ApiBody, ApiOperation, ApiTags} from '@nestjs/swagger';
import {NoveltyService} from '../services/novelty.service';
import {Body, Controller, Get, Headers, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {CreateNoveltyDto} from '../dto/create-novelty.dto';
import {UpdateNoveltyDto} from '../dto/update-novelty.dto';
import {Novelty} from '../entities/novelty.entity';
import {AuthGuard} from "../../auth/auth.guard";
import { Request } from 'express';
import { NoveltyMasterTemporappDto } from '../dto/novelty-master-temporapp.dto';
import { AxiosResponse } from 'axios';

@ApiTags('Novelty')
@Controller('api/novelty')
export class NoveltyController {
  constructor(private readonly noveltyService: NoveltyService) {}

  @Post()
  @ApiOperation({ summary: 'Crear reporte de novedad' })
  @UseGuards(AuthGuard)
  async create(@Body() novelty: CreateNoveltyDto): Promise<Novelty> {
    return await this.noveltyService.create(novelty);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar novedad' })
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateNoveltyDto: UpdateNoveltyDto,
  ): Promise<UpdateNoveltyDto> {
    return await this.noveltyService.update(id, updateNoveltyDto);
  }

  

  @Get(':page/:limit')
  @ApiOperation({ summary: 'Filtrar novedad por ID' })
  //@UseGuards(AuthGuard)
  async findAllNoveltiesBasic(@Param('page') page: number, @Param('limit') limit: number): Promise<any> {
    return await this.noveltyService.findAllNovelties(page, limit, null, null);
  }

  @Get(':page/:limit/:year')
  @ApiOperation({ summary: 'Filtrar novedad por ID' })
  //@UseGuards(AuthGuard)
  async findAllNoveltiesYear(@Param('page') page: number, @Param('limit') limit: number, @Param('year') year?: string): Promise<any> {
    return await this.noveltyService.findAllNovelties(page, limit, year, null);
  }
  
  @Get(':page/:limit/:year/:month')
  @ApiOperation({ summary: 'Filtrar novedad por ID' })
  //@UseGuards(AuthGuard)
  async findAllNovelties(@Param('page') page: number, @Param('limit') limit: number, @Param('year') year?: string, @Param('month') month?: string): Promise<any> {
    return await this.noveltyService.findAllNovelties(page, limit, year, month);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Filtrar novedad por ID' })
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<Novelty> {
    return await this.noveltyService.findOne(id);
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
  ): Promise<Novelty[]> {
    const { roleKey } = request['user'];
    console.log(request['user']);
    return await this.noveltyService.findBy(page, limit, by, value, requestBody, roleKey, request['user'].id);
  }

  @Post('ws/find')
  @ApiOperation({ summary: 'Filtrar novedades por documento (Temporapp Endpoint)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        identification: { type: 'string' },
        initialDate: { type: 'string' },
        finalDate: { type: 'string' },
        type: { type: 'string' },
        token: { type: 'string' },
      },
    },
  })
  async getNoveltyByDocument(
    @Body('identification') identification: string,
    @Body('initialDate') initialDate: string,
    @Body('finalDate') finalDate: string,
    @Body('type') type: string,
    @Body('token') token: string,
  ): Promise<any> {
    return this.noveltyService.getNoveltyByDocument(
      identification,
      initialDate,
      finalDate,
      type,
      token,
    );
  }

  @Post('ws/create')
  @ApiOperation({ summary: 'Crear novedad (Temporapp Endpoint)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        identifier: { type: 'string' },
        documentType: { type: 'string' },
        document: { type: 'string' },
        hiringId: { type: 'string' },
        businessName: { type: 'string' },
        nit: { type: 'string' },
        clientCode: { type: 'string' },
        date: { type: 'string' },
        advanceValue: { type: 'string' },
        token: { type: 'string' },
      },
    },
  })
  async createNovelty(
    @Body('identifier') identifier: string,
    @Body('documentType') documentType: string,
    @Body('document') document: string,
    @Body('hiringId') hiringId: string,
    @Body('businessName') businessName: string,
    @Body('nit') nit: string,
    @Body('clientCode') clientCode: string,
    @Body('date') date: string,
    @Body('advanceValue') advanceValue: string,
    @Body('token') token: string,
  ): Promise<any> {
    return this.noveltyService.createNovelty(
      identifier,
      documentType,
      document,
      hiringId,
      businessName,
      nit,
      clientCode,
      date,
      advanceValue,
      token,
    );
  }



  @Post('ws/maestro')
  @ApiOperation({ summary: 'Maestro para el crud de novedades' })
  @UseGuards(AuthGuard)
  async createNoveltyMaster(@Body() novelty: NoveltyMasterTemporappDto, @Headers('authorization-temporapp') token: string): Promise<AxiosResponse> {
    return await this.noveltyService.createNoveltyMaster(novelty, token);
  }
  
}
