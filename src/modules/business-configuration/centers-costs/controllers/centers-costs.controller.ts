import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { CostCenters } from '../entities/centers-costs.entity';
import { CentersCostsService } from '../services/centers-costs.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCentersCostsDto } from '../dto/create-centers-costs.dto';

@ApiTags('Centers of costs')
@Controller('api/centers-costs')
export class CentersCostsController {
  constructor(private readonly centersCostsService: CentersCostsService) {}

  @Post()
  async create(
    @Body() centersCosts: CreateCentersCostsDto,
  ): Promise<CostCenters> {
    return await this.centersCostsService.create(centersCosts);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() centersCosts: CostCenters,
  ): Promise<CostCenters> {
    return await this.centersCostsService.update(id, centersCosts);
  }

  @Get()
  async findAll(): Promise<CostCenters[]> {
    return await this.centersCostsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CostCenters> {
    return await this.centersCostsService.findOne(id);
  }

  @Get(':page/:limit/:by/:value')
  async findBy(
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Param('by') by: string,
    @Param('value') value: string,
  ): Promise<CostCenters[]> {
    return await this.centersCostsService.findBy(page, limit, by, value);
  }
}
