/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {PucService} from '../services/puc.service';
import {CreatePucDto} from '../dto/create-puc.dto';
import {Puc} from '../entities/puc.entity';
import {ApiTags} from '@nestjs/swagger';
import {UpdatePucDto} from '../dto/update-puc.dto';

@ApiTags('Puc')
@Controller('api/puc')
export class PucController {
    constructor(private readonly pucService: PucService) {
    }

    @Post()
    async create(@Body() puc: CreatePucDto): Promise<Puc> {
        return await this.pucService.create(puc);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePucDto: UpdatePucDto,
    ): Promise<UpdatePucDto> {
        return await this.pucService.update(id, updatePucDto);
    }

    @Get(':page/:limit')
    async findAll(@Param('page') page: number, @Param('limit') limit: number): Promise<Puc[]> {
        return await this.pucService.findAll(page, limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Puc> {
        return await this.pucService.findOne(id);
    }

    @Get(':by/:value')
    async findBy(
        @Param('by') by: string,
        @Param('value') value: string,
    ): Promise<Puc[]> {
        return await this.pucService.findBy(by, value);
    }
}
