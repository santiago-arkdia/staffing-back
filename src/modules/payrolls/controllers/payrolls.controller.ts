/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body, UseGuards} from '@nestjs/common';
import {Payrolls} from '../entities/payrolls.entity';
import {PayrollsService} from '../services/payrolls.service';
import {ApiTags} from '@nestjs/swagger';
import {PayrollsDto} from '../dto/payrolls.dto';
import { UpdatPayrollDto } from '../dto/update-payrolls.dto';
import { PayrollsTemporAppService } from '../services/payrolls-temporapp.service';
import { Novelty } from 'src/modules/novelty/entities/novelty.entity';

@ApiTags('Payrolls')
@Controller('api/payrolls')
export class PayrollsController {
    constructor(
      private readonly payrollService: PayrollsService,
      private readonly payrollsTemporAppService: PayrollsTemporAppService
      
    ) {
    }

    @Post("generate-payroll")
    async create( @Body() payrollsDto: PayrollsDto): Promise<Payrolls> {
        return await this.payrollService.generatePayroll( payrollsDto);
    }
    @Put("update-novelty/:id")
    async updateNovelty( @Param('id') id: string,  @Body() payrollsDto: PayrollsDto): Promise<Payrolls> {
        return await this.payrollService.updatePayroll(id, payrollsDto);
    }

    @Post("donwload-payroll/:payroll")
    async donwloadPayroll(@Param('payroll') payroll: string): Promise<any> {
        return await this.payrollService.downloadPayroll(payroll);
    }

    @Put(':id')
    async update( @Param('id') id: string,  @Body() payroll: UpdatPayrollDto): Promise<UpdatPayrollDto> {
      this.payrollsTemporAppService.noveltyPayroll(id);
      return await this.payrollService.update(id, payroll);
    }

    @Get(':id')
    async findById( @Param('id') id: string): Promise<Payrolls> {
      return await this.payrollService.findById(id);
    }

    @Get(':id/novelties-not-added')
    async listNoveltyNotAdded( @Param('id') id: string): Promise<Novelty[]> {
      return await this.payrollService.noveltyNotAdded(id);
    }
  
    @Post(':page/:limit')
    //@UseGuards(AuthGuard)
    async findBy( @Param('page') page: number, @Param('limit') limit: number, @Body() requestBody: Record<string, any>): Promise<Payrolls[]> {
      return await this.payrollService.findBy(page, limit, requestBody);
    }
}
