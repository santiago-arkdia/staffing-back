import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { Schedules } from '../entities/schedules.entity';
import { SchedulesService } from '../services/schedules.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMultipleSchedulesDto, CreateSchedulesDto } from '../dto/create-schedules.dto';
import { UpdateSchedulesDto } from '../dto/update-schedules.dto';

@ApiTags('Schedules')
@Controller('api/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  async create(@Body() schedules: CreateMultipleSchedulesDto): Promise<Schedules[]> {
    return await this.schedulesService.create(schedules.schedules);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() schedules: UpdateSchedulesDto): Promise<Schedules> {
    return await this.schedulesService.update(id, schedules);
  }

  @Get()
  async findAll(): Promise<Schedules[]> {
    return await this.schedulesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Schedules> {
    return await this.schedulesService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<Schedules[]> {
    return await this.schedulesService.findBy(by, value);
  }
}
