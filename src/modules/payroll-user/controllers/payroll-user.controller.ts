/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body} from '@nestjs/common';
import {Payroll} from '../entities/payroll-user.entity';
import {PayrollUserService} from '../services/payroll-user.service';
import {ApiTags} from '@nestjs/swagger';
import {PayrollUsersDto} from '../dto/payroll-user.dto';

@ApiTags('Payroll User')
@Controller('api/payroll-user')
export class PayrollUserController {
    constructor(private readonly payrollService: PayrollUserService) {
    }

    @Post()
    async create(@Body() payroll: PayrollUsersDto): Promise<Payroll> {
        return await this.payrollService.create(payroll);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() payroll: PayrollUsersDto,
    ): Promise<Payroll> {
        return await this.payrollService.update(id, payroll);
    }

    @Get('by/:by/:value')
    async findBy(@Param('by') by: string, @Param('value') value: string): Promise<Payroll[]> {
      return await this.payrollService.findBy(by, value, null);
    }

    @Get()
    async findAll(): Promise<Payroll[]> {
        return await this.payrollService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Payroll> {
        return await this.payrollService.findOne(id);
    }

    @Get(':page/:limit/:by/:value')
    async findByFilters(
        @Param('page') page: number,
        @Param('limit') limit: number,
        @Param('by') by: string,
        @Param('value') value: string,
    ): Promise<Payroll[]> {
        return await this.payrollService.findByFilters(page, limit, by, value);
    }
}
