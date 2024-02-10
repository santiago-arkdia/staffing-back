/* eslint-disable prettier/prettier */
import {ApiBody, ApiOperation, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {CreateNoveltySocialSecurityDto} from '../dto/create-novelty-social-security.dto';
import {UpdateConceptsSocialSecurityDto} from '../dto/update-novelty-social-security.dto';
import {AuthGuard} from "../../auth/auth.guard";
import { Request } from 'express';
import { NoveltySocialSecurity } from '../entities/novelty-social-security.entity';
import { NoveltySocialSecurityService } from '../services/novelty-social-security.service';

@ApiTags('Novelty Social Security')
@Controller('api/novelty-social-security')
export class NoveltySocialSecurityController {
  constructor(private readonly noveltySocialSecurityService: NoveltySocialSecurityService) {}

  @Post()
  @ApiOperation({ summary: 'Crear reporte de novedad' })
  // @UseGuards(AuthGuard)
  async create(@Body() novelty: CreateNoveltySocialSecurityDto): Promise<NoveltySocialSecurity> {
    return await this.noveltySocialSecurityService.create(novelty);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar novedad' })
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateNoveltyDto: UpdateConceptsSocialSecurityDto,
  ): Promise<UpdateConceptsSocialSecurityDto> {
    return await this.noveltySocialSecurityService.update(id, updateNoveltyDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Filtrar novedad por ID' })
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<NoveltySocialSecurity> {
    return await this.noveltySocialSecurityService.findOne(id);
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
  ): Promise<NoveltySocialSecurity[]> {
    const { roleKey } = request['user'];
    return await this.noveltySocialSecurityService.findBy(page, limit, by, value, requestBody, roleKey);
  }

}
