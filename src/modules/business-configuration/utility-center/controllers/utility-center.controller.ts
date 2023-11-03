import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { UtilityCenter } from '../entities/utility-center.entity';
import { UtilityCenterService } from '../services/utility-center.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUtilityCenterDto } from '../dto/utility-center-costs.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@ApiTags('Utility Center')
@Controller('api/utility-center')
export class UtilityCenterController {
  constructor(private readonly utilityCenterService: UtilityCenterService) {}

  @Post()
  async create(
    @Body() utilityCenter: CreateUtilityCenterDto,
  ): Promise<UtilityCenter> {
    return await this.utilityCenterService.create(utilityCenter);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() utilityCenter: UtilityCenter,
  ): Promise<UtilityCenter> {
    return await this.utilityCenterService.update(id, utilityCenter);
  }

  @Get(':page/:limit')
  async findAll(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<UtilityCenter[]> {
    return await this.utilityCenterService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UtilityCenter> {
    return await this.utilityCenterService.findOne(id);
  }

  @Get(':page/:limit/:by/:value')
  async findBy(
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Param('by') by: string,
    @Param('value') value: string,
  ): Promise<UtilityCenter[]> {
    return await this.utilityCenterService.findBy(page, limit, by, value);
  }
}
