import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { Payroll } from '../entities/payroll.entity';
import { PayrollService } from '../services/payroll.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePayrollsDto } from '../dto/create-payroll.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@ApiTags('Payroll')
@Controller('api/payrolls')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post()
  async create(@Body() payroll: CreatePayrollsDto): Promise<Payroll> {


    return await this.payrollService.create(payroll);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payroll: Payroll): Promise<Payroll> {
    return await this.payrollService.update(id, payroll);
  }

  @Get()
  async findAll(): Promise<Payroll[]> {
    return await this.payrollService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Payroll> {
    return await this.payrollService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<Payroll[]> {
    return await this.payrollService.findBy(by, value);
  }
}
