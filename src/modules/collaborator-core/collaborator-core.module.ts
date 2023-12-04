/* eslint-disable prettier/prettier */
import {Body, Get, Module, Param, Post, Put} from '@nestjs/common';
import {CreateCollaboratorDto} from "../collaborators/dto/create-collaborators.dto";
import {UpdateCollaboratorDto} from "../collaborators/dto/update-collaborators.dto";
import {CollaboratorCoreService} from "./services/collaborator-core.service";
import {CollaboratorCore} from "./entities/collaborator-core";

@Module({})
export class CollaboratorCoreModule {
    constructor(private readonly coreService: CollaboratorCoreService) {
    }

    @Post()
    async create(
        @Body() collaborator: CreateCollaboratorDto,
    ): Promise<CollaboratorCore> {
        return await this.coreService.create(collaborator);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCollaboratorDto: UpdateCollaboratorDto,
    ): Promise<UpdateCollaboratorDto> {
        return await this.coreService.update(id, updateCollaboratorDto);
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
