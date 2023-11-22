/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {EpsService} from '../services/eps.service';
import {CreateEpsDto} from '../dto/create-eps.dto';
import {Eps} from '../entities/eps.entity';
import {ApiTags} from '@nestjs/swagger';
import {UpdateEpsDto} from '../dto/update-eps.dto';

@ApiTags('Eps')
@Controller('api/eps')
export class EpsController {
    constructor(private readonly epsService: EpsService) {
    }

    @Post()
    async create(@Body() eps: CreateEpsDto): Promise<Eps> {
        return await this.epsService.create(eps);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateEpsDto: UpdateEpsDto,
    ): Promise<UpdateEpsDto> {
        return await this.epsService.update(id, updateEpsDto);
    }

    @Get()
    async findAll(): Promise<Eps[]> {
        return await this.epsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Eps> {
        return await this.epsService.findOne(id);
    }

    @Get(':by/:value')
    async findBy(
        @Param('by') by: string,
        @Param('value') value: string,
    ): Promise<Eps[]> {
        return await this.epsService.findBy(by, value);
    }
}
