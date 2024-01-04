import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { Schedules } from '../entities/schedules.entity';
import { SchedulesService } from '../services/schedules.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateSchedulesDto } from '../dto/create-schedules.dto';
import { UpdateSchedulesDto } from '../dto/update-schedules.dto';

@ApiTags('Schedules')
@Controller('api/roles')
export class SchedulesController {
  constructor(private readonly rolesService: SchedulesService) {}

  @Post()
  async create(@Body() roles: CreateSchedulesDto): Promise<Schedules> {
    return await this.rolesService.create(roles);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() roles: UpdateSchedulesDto): Promise<Schedules> {
    return await this.rolesService.update(id, roles);
  }

  @Get()
  async findAll(): Promise<Schedules[]> {
    return await this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Schedules> {
    return await this.rolesService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<Schedules[]> {
    return await this.rolesService.findBy(by, value);
  }
}
