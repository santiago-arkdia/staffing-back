/* eslint-disable prettier/prettier */
import {Controller, Post, Get, Body, Param, Delete} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {StateNoveltyService} from '../services/state-novelty.service';
import {NoveltyState} from '../entities/novelty-state.entity';
import {CreateNoveltyStateDto} from '../dto/create-state-novelty.dto';

@ApiTags('State Novelty')
@Controller('api/state-novelty')
export class StateNoveltyController {
    constructor(private readonly stateNovelty: StateNoveltyService) {
    }

    @Post()
    async create(
        @Body() novletyState: CreateNoveltyStateDto,
    ): Promise<NoveltyState> {
        return await this.stateNovelty.create(novletyState);
    }

    @Get()
    async findAll(): Promise<NoveltyState[]> {
        return await this.stateNovelty.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<NoveltyState> {
        return await this.stateNovelty.findOne(id);
    }

    @Get(':by/:value')
    async findBy(
        @Param('by') by: string,
        @Param('value') value: string,
    ): Promise<NoveltyState[]> {
        return await this.stateNovelty.findBy(by, value, null);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<NoveltyState> {
        return await this.stateNovelty.delete(id);
    }
}
