/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {ContractsService} from '../services/contracts.service';
import {Contract} from '../entities/contracts.entity';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Contracts')
@Controller('api/contracts')
export class ContractsController {
    constructor(private readonly conceptService: ContractsService) {
    }

    @Get()
    async findAll(): Promise<Contract[]> {
        return await this.conceptService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Contract> {
        return await this.conceptService.findOne(id);
    }

    @Get(':by/:value')
    async findBy(
        @Param('by') by: string,
        @Param('value') value: string
    ): Promise<Contract[]> {
        return await this.conceptService.findBy(by, value);
    }
}
