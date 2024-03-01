/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body, UseGuards} from '@nestjs/common';
import {Payrolls} from '../entities/payrolls.entity';
import {PayrollsService} from '../services/payrolls.service';
import {ApiTags} from '@nestjs/swagger';
import {PayrollsDto} from '../dto/payrolls.dto';
import { UpdatPayrollDto } from '../dto/update-payrolls.dto';

@ApiTags('Payrolls')
@Controller('api/payrolls')
export class PayrollsController {
    constructor(private readonly payrollService: PayrollsService) {
    }

    @Post("generate-payroll/:year/:month")
    async create(@Param('year') year: string, @Param('month') month: string,  @Body() payrollsDto: PayrollsDto): Promise<Payrolls> {
        return await this.payrollService.generatePayroll(year, month, payrollsDto);
    }

    @Post("donwload-payroll/:payroll")
    async donwloadPayroll(@Param('payroll') payroll: string): Promise<any> {
        return await this.payrollService.downloadPayroll(payroll);
    }

    @Put(':id')
    async update( @Param('id') id: string,  @Body() payroll: UpdatPayrollDto): Promise<UpdatPayrollDto> {
      return await this.payrollService.update(id, payroll);
    }

    @Get(':id')
    async findById( @Param('id') id: string): Promise<Payrolls> {
      return await this.payrollService.findById(id);
    }
  
    @Post(':page/:limit')
    //@UseGuards(AuthGuard)
    async findBy( @Param('page') page: number, @Param('limit') limit: number, @Body() requestBody: Record<string, any>): Promise<Payrolls[]> {
      return await this.payrollService.findBy(page, limit, requestBody);
    }
}
