/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body, Delete, UseGuards} from '@nestjs/common';
import {JobPositions} from '../entities/job-positions.entity';
import {JobPositionsService} from '../services/job-positions.service';
import {ApiTags} from '@nestjs/swagger';
import {CreateJobPositionsDto} from '../dto/job-positions.dto';
import { AuthExternalGuard } from 'src/modules/auth/auth-external.guard';
import { UpdateJobPositionsDto } from '../dto/update-job-positions.dto';

@ApiTags('Job Positions')
@Controller('api/job-positions')
export class JobPositionsController {
    constructor(private readonly jobPositionsService: JobPositionsService) {}

    @Post()
    async create(
        @Body() jobPositions: CreateJobPositionsDto,
    ): Promise<JobPositions> {
        return await this.jobPositionsService.create(jobPositions);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() jobPositions: UpdateJobPositionsDto,
    ): Promise<JobPositions> {
        return await this.jobPositionsService.update(id, jobPositions);
    }

    @Get()
    async findAll(): Promise<JobPositions[]> {
        return await this.jobPositionsService.findAll();
    }

    @Get("get-all")
    @UseGuards(AuthExternalGuard)
    async getAll(): Promise<JobPositions[]> {
        return await this.jobPositionsService.getAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<JobPositions> {
        return await this.jobPositionsService.findOne(id);
    }

    @Get('hourly-by-position/:id')
    @UseGuards(AuthExternalGuard)
    async findOneExternal(@Param('id') id: string): Promise<JobPositions> {
        return await this.jobPositionsService.findOne(id);
    }

    @Get(':page/:limit/:by/:value')
    async findBy(
        @Param('page') page: number,
        @Param('limit') limit: number,
        @Param('by') by: string,
        @Param('value') value: string,
    ): Promise<JobPositions[]> {
        return await this.jobPositionsService.findBy(page, limit, by, value);
    }
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<JobPositions> {
        return await this.jobPositionsService.delete(id);
    }

  
}
