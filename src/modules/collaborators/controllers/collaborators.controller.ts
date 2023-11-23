/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {CollaboratorService} from '../services/collaborators.service';
import {CreateCollaboratorDto} from '../dto/create-collaborators.dto';
import {Collaborator} from '../entities/collaborators.entity';
import {ApiTags} from '@nestjs/swagger';
import {UpdateCollaboratorDto} from '../dto/update-collaborators.dto';

@ApiTags('Collaborator')
@Controller('api/collaborator')
export class CollaboratorController {
    constructor(private readonly collaboratorService: CollaboratorService) {
    }

    @Post()
    async create(
        @Body() collaborator: CreateCollaboratorDto,
    ): Promise<Collaborator> {
        return await this.collaboratorService.create(collaborator);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCollaboratorDto: UpdateCollaboratorDto,
    ): Promise<UpdateCollaboratorDto> {
        return await this.collaboratorService.update(id, updateCollaboratorDto);
    }

    @Get()
    async findAll(): Promise<Collaborator[]> {
        return await this.collaboratorService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Collaborator> {
        return await this.collaboratorService.findOne(id);
    }

    @Get(':page/:limit/:by/:value')
    async findBy(
        @Param('page') page: number,
        @Param('limit') limit: number,
        @Param('by') by: string,
        @Param('value') value: string,
    ): Promise<Collaborator[]> {
        return await this.collaboratorService.findBy(page, limit, by, value);
    }
}
