/* eslint-disable prettier/prettier */
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NoveltyService } from '../services/novelty.service';
import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { CreateNoveltyDto } from '../dto/create-novelty.dto';
import { UpdateNoveltyDto } from '../dto/update-novelty.dto';
import { Novelty } from '../entities/novelty.entity';

@ApiTags('Novelty')
@Controller('api/novelty')
export class NoveltyController {
  constructor(private readonly noveltyService: NoveltyService) {}

  @Post()
  @ApiOperation({ summary: 'Reportar novedad' })
  async create(@Body() novelty: CreateNoveltyDto): Promise<Novelty> {
    novelty.initialDate = new Date(novelty.initialDate);
    novelty.finalDate = new Date(novelty.finalDate);
    return await this.noveltyService.create(novelty);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar novedad' })
  async update(
    @Param('id') id: string,
    @Body() updateNoveltyDto: UpdateNoveltyDto,
  ): Promise<UpdateNoveltyDto> {
    updateNoveltyDto.initialDate = new Date(updateNoveltyDto.initialDate);
    updateNoveltyDto.finalDate = new Date(updateNoveltyDto.finalDate);
    return await this.noveltyService.update(id, updateNoveltyDto);
  }

  /*@Get(':page/:limit')
  @ApiOperation({ summary: 'Filtrar novedades por paginación' })
  async findAll(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<Novelty[]> {
    return await this.noveltyService.findAll(page, limit);
  }*/

  @Get(':id')
  @ApiOperation({ summary: 'Filtrar novedad por ID' })
  async findOne(@Param('id') id: string): Promise<Novelty> {
    return await this.noveltyService.findOne(id);
  }

  @Get(':page/:limit/:by/:value')
  @ApiOperation({ summary: 'Filtrar novedades por valor y paginación' })
  async findBy(
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Param('by') by: string,
    @Param('value') value: string,
  ): Promise<Novelty[]> {
    return await this.noveltyService.findBy(page, limit, by, value);
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
}
