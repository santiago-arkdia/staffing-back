/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {ConceptsService} from '../services/concepts.service';
import {CreateConceptsDto} from '../dto/create-concepts.dto';
import {Concept} from '../entities/concepts.entity';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Concepts')
@Controller('api/concepts')
export class ConceptsController {
    constructor(private readonly conceptService: ConceptsService) {
    }

    @Post()
    async create(@Body() concept: CreateConceptsDto): Promise<Concept> {
        return await this.conceptService.create(concept);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() concept: CreateConceptsDto,
    ): Promise<Concept> {
        return await this.conceptService.update(id, concept);
    }

    @Get()
    async findAll(): Promise<Concept[]> {
        return await this.conceptService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Concept> {
        return await this.conceptService.findOne(id);
    }

    @Get(':by/:value')
    async findBy(
        @Param('by') by: string,
        @Param('value') value: string
    ): Promise<Concept[]> {
        return await this.conceptService.findBy(by, value);
    }
}
