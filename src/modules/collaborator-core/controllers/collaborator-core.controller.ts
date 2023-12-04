/* eslint-disable prettier/prettier */
import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {CollaboratorCoreService} from "../services/collaborator-core.service";
import {CreateCoreDto} from "../dto/create-core.dto";
import {CollaboratorCore} from "../entities/collaborator-core";

@Controller('collaborator-core')
export class CollaboratorCoreController {
    constructor(private readonly coreService: CollaboratorCoreService) {
    }

    @Post()
    async create(
        @Body() collaborator: CreateCoreDto,
    ): Promise<CollaboratorCore> {
        return await this.coreService.create(collaborator);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() update: CreateCoreDto,
    ): Promise<CreateCoreDto> {
        return await this.coreService.update(id, update);
    }

    @Get()
    async findAll(): Promise<CollaboratorCore[]> {
        return await this.coreService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CollaboratorCore> {
        return await this.coreService.findOne(id);
    }

    @Get(':page/:limit/:by/:value')
    async findBy(
        @Param('page') page: number,
        @Param('limit') limit: number,
        @Param('by') by: string,
        @Param('value') value: string,
    ): Promise<CollaboratorCore[]> {
        return await this.coreService.findBy(page, limit, by, value);
    }
}
