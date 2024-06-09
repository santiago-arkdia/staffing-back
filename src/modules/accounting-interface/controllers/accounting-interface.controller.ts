/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {AccountingInterfaceService} from '../services/accounting-interface.service';
import {CreateAccountingInterfaceDto} from '../dto/create-accounting-interface.dto';
import {AccountingInterface} from '../entities/accounting-interface.entity';
import {ApiTags} from '@nestjs/swagger';
import {UpdateAccountingInterfaceDto} from '../dto/update-accounting-interface.dto';
import { FilterInterfaceDto } from '../dto/filter-accounting.dtos';

@ApiTags('Accounting Interface')
@Controller('api/accounting-interface')
export class AccountingInterfaceController {
    constructor(private readonly epsService: AccountingInterfaceService) {
    }

    @Post()
    async create(@Body() eps: CreateAccountingInterfaceDto): Promise<AccountingInterface> {
        return await this.epsService.create(eps);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAccountingInterfaceDto: UpdateAccountingInterfaceDto,
    ): Promise<AccountingInterface> {
        return await this.epsService.update(id, updateAccountingInterfaceDto);
    }

    // @Post("get-all")
    // async findAll(@Body() filterIntefaceDto: FilterInterfaceDto): Promise<AccountingInterface[]> {
    //     return await this.epsService.findAll(filterIntefaceDto);
    // }

    @Get("get-all/:page/:limit")
    async findAll(@Param('page') page: number, @Param('limit') limit: number): Promise<AccountingInterface[]> {
        return await this.epsService.findAll(page, limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<AccountingInterface> {
        return await this.epsService.findOne(id);
    }

    // @Get(':by/:value')
    // async findBy(
    //     @Param('by') by: string,
    //     @Param('value') value: string,
    // ): Promise<AccountingInterface[]> {
    //     return await this.epsService.findBy(by, value);
    // }
}
