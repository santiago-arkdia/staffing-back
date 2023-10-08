import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { Region } from '../entities/region.entity';
import { RegionService } from '../services/region.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRegionDto } from '../dto/create-region.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@ApiTags('Regions')
@Controller('api/region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  async create(@Body() region: CreateRegionDto): Promise<Region> {
    return await this.regionService.create(region);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() region: Region): Promise<Region> {
    return await this.regionService.update(id, region);
  }

  @Get()
  async findAll(): Promise<Region[]> {
    return await this.regionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Region> {
    return await this.regionService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<Region[]> {
    return await this.regionService.findBy(by, value);
  }
}
