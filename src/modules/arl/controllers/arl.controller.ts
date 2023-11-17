/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {ArlService} from '../services/arl.service';
import {CreateArlDto} from '../dto/create-arl.dto';
import {Arl} from '../entities/arl.entity';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {UpdateArlDto} from '../dto/update-arl.dto';

@ApiTags('Arl')
@Controller('api/arl')
export class ArlController {
    constructor(private readonly arlService: ArlService) {}

    @Post()
    @ApiOperation({ summary: 'Crear ARL' })
    async create(@Body() arl: CreateArlDto): Promise<Arl> {
        return await this.arlService.create(arl);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar ARL' })
    async update(
        @Param('id') id: string,
        @Body() updateArlDto: UpdateArlDto,
    ): Promise<UpdateArlDto> {
        return await this.arlService.update(id, updateArlDto);
    }

    @Get()
    async findAll(): Promise<Arl[]> {
        return await this.arlService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Arl> {
        return await this.arlService.findOne(id);
    }

    @Get(':by/:value')
    async findBy(
        @Param('by') by: string,
        @Param('value') value: string,
    ): Promise<Arl[]> {
        return await this.arlService.findBy(by, value);
    }
}
