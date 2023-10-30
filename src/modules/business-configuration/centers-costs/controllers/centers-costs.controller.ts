import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { CentersCosts } from '../entities/centers-costs.entity';
import { CentersCostsService } from '../services/centers-costs.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCentersCostsDto } from '../dto/create-centers-costs.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@ApiTags('Centers of costs')
@Controller('api/centers-costs')
export class CentersCostsController {
  constructor(private readonly centersCostsService: CentersCostsService) {}

  @Post()
  async create(@Body() centersCosts: CreateCentersCostsDto): Promise<CentersCosts> {
    return await this.centersCostsService.create(centersCosts);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() centersCosts: CentersCosts): Promise<CentersCosts> {
    return await this.centersCostsService.update(id, centersCosts);
  }

  @Get(':page/:limit')
  async findAll(@Param('page') page: number, @Param('limit') limit: number): Promise<CentersCosts[]> {
    return await this.centersCostsService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CentersCosts> {
    return await this.centersCostsService.findOne(id);
  }

  @Get(':page/:limit/:by/:value')
  async findBy(@Param('page') page: number, @Param('limit') limit: number, @Param('by') by: string, @Param('value') value: string): Promise<CentersCosts[]> {
    return await this.centersCostsService.findBy(page, limit, by, value);
  }
}
