/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {ConceptsSocialSecurityService} from '../services/concepts-social-security.service';
import {CreateConceptsSocialSecurityDto} from '../dto/create-concepts-social-security.dto';
import {ConceptsSocialSecurity} from '../entities/concepts-social-security.entity';
import {ApiTags} from '@nestjs/swagger';
import {UpdateConceptsSocialSecurityDto} from '../dto/update-concepts-social-security.dto';

@ApiTags('Concepts Social Security')
@Controller('api/concepts-social-security')
export class ConceptsSocialSecurityController {
    constructor(private readonly conceptsretirementService: ConceptsSocialSecurityService) {
    }

    @Post()
    async create(@Body() conceptsretirement: CreateConceptsSocialSecurityDto): Promise<ConceptsSocialSecurity> {
        return await this.conceptsretirementService.create(conceptsretirement);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateConceptsSocialSecurityDto: UpdateConceptsSocialSecurityDto,
    ): Promise<UpdateConceptsSocialSecurityDto> {
        return await this.conceptsretirementService.update(id, updateConceptsSocialSecurityDto);
    }

    @Get()
    async findAll(): Promise<ConceptsSocialSecurity[]> {
        return await this.conceptsretirementService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ConceptsSocialSecurity> {
        return await this.conceptsretirementService.findOne(id);
    }

    @Get(':by/:value')
    async findBy(
        @Param('by') by: string,
        @Param('value') value: string,
    ): Promise<ConceptsSocialSecurity[]> {
        return await this.conceptsretirementService.findBy(by, value);
    }
}
