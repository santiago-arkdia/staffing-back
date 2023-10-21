import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { Payroll } from '../entities/payroll.entity';
import { PayrollService } from '../services/payroll.service';
import { ApiTags } from '@nestjs/swagger';
import { PayrollsDto } from '../dto/payroll.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@ApiTags('Payroll')
@Controller('api/payrolls')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post()
  async create(@Body() payroll: PayrollsDto): Promise<Payroll> {
    return await this.payrollService.create(payroll);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payroll: PayrollsDto): Promise<Payroll> {
    return await this.payrollService.update(id, payroll);
  }

  @Get(':page/:limit')
  async findAll(@Param('page') page: number, @Param('limit') limit: number): Promise<Payroll[]> {
    return await this.payrollService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Payroll> {
    console.log(id);
    return await this.payrollService.findOne(id);
  }

  @Get('by/:by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<Payroll[]> {
    return await this.payrollService.findBy(by, value);
  }
}
