/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {ConceptsRetirementService} from '../services/concepts-retirement.service';
import {CreateConceptsRetirementDto} from '../dto/create-concepts-retirement.dto';
import {ConceptsRetirement} from '../entities/concepts-retirement.entity';
import {ApiTags} from '@nestjs/swagger';
import {UpdateConceptsRetirementDto} from '../dto/update-concepts-retirement.dto';

@ApiTags('Concepts-Retirement')
@Controller('api/concepts-retirement')
export class ConceptsRetirementController {
    constructor(private readonly conceptsretirementService: ConceptsRetirementService) {
    }

    @Post()
    async create(@Body() conceptsretirement: CreateConceptsRetirementDto): Promise<ConceptsRetirement> {
        return await this.conceptsretirementService.create(conceptsretirement);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateConceptsRetirementDto: UpdateConceptsRetirementDto,
    ): Promise<UpdateConceptsRetirementDto> {
        return await this.conceptsretirementService.update(id, updateConceptsRetirementDto);
    }

    @Get()
    async findAll(): Promise<ConceptsRetirement[]> {
        return await this.conceptsretirementService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ConceptsRetirement> {
        return await this.conceptsretirementService.findOne(id);
    }

    @Get(':by/:value')
    async findBy(
        @Param('by') by: string,
        @Param('value') value: string,
    ): Promise<ConceptsRetirement[]> {
        return await this.conceptsretirementService.findBy(by, value);
    }
}
