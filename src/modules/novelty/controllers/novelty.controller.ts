/* eslint-disable prettier/prettier */
import {ApiBody, ApiOperation, ApiTags} from '@nestjs/swagger';
import {NoveltyService} from '../services/novelty.service';
import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {CreateNoveltyDto} from '../dto/create-novelty.dto';
import {UpdateNoveltyDto} from '../dto/update-novelty.dto';
import {Novelty} from '../entities/novelty.entity';

@ApiTags('Novelty')
@Controller('api/novelty')
export class NoveltyController {
  constructor(private readonly noveltyService: NoveltyService) {}

  @Post()
  @ApiOperation({ summary: 'Crear reporte de novedad' })
  // @UseGuards(AuthGuard)
  async create(@Body() novelty: CreateNoveltyDto): Promise<Novelty> {
    return await this.noveltyService.create(novelty);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar novedad' })
  // @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateNoveltyDto: UpdateNoveltyDto,
  ): Promise<UpdateNoveltyDto> {
    return await this.noveltyService.update(id, updateNoveltyDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Filtrar novedad por ID' })
  // @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<Novelty> {
    return await this.noveltyService.findOne(id);
  }

  @Post(':page/:limit/:by/:value')
  @ApiOperation({ summary: 'Filtrar novedades por valor y paginación' })
  // @UseGuards(AuthGuard)
  async findBy(
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Param('by') by: string,
    @Param('value') value: string,
    @Body() requestBody: Record<string, any>
  ): Promise<Novelty[]> {
    return await this.noveltyService.findBy(page, limit, by, value, requestBody);
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
