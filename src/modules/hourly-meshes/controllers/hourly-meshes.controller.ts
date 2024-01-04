import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { CreateHourlyMeshesDto } from '../dto/create-hourly-meshes.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { UpdateHourlyMeshesDto } from '../dto/update-hourly-meshes.dto';
import { HourlyMeshesService } from '../services/hourly-meshes.service';
import { ApiTags } from '@nestjs/swagger';
import { HourlyMeshes } from '../entities/hourly-meshes.entity';

@ApiTags('Hourly Meshes')
@Controller('api/hourlyMeshes')
export class HourlyMeshesController {
  constructor(private readonly hourlyMeshesService: HourlyMeshesService) {}

  @Post()
  async create(@Body() hourlyMeshes: CreateHourlyMeshesDto): Promise<HourlyMeshes> {
    return await this.hourlyMeshesService.create(hourlyMeshes);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() hourlyMeshes: UpdateHourlyMeshesDto): Promise<HourlyMeshes> {
    return await this.hourlyMeshesService.update(id, hourlyMeshes);
  }

  @Get()
  async findAll(): Promise<HourlyMeshes[]> {
    return await this.hourlyMeshesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<HourlyMeshes> {
    return await this.hourlyMeshesService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<HourlyMeshes[]> {
    return await this.hourlyMeshesService.findBy(by, value);
  }
}
