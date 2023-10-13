import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { ModuleParameterization } from '../entities/module-parameterization.entity';
import { ModuleParameterizationService } from '../services/module-parameterization.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateModuleParameterizationsDto } from '../dto/create-module-parameterization.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@ApiTags('Module Parameterization')
@Controller('api/module-parameterization')
export class ModuleParameterizationController {
  constructor(
    private readonly moduleParameterizationService: ModuleParameterizationService,
  ) {}

  @Post()
  async create(
    @Body() moduleParameterization: CreateModuleParameterizationsDto,
  ): Promise<ModuleParameterization> {
    return await this.moduleParameterizationService.create(
      moduleParameterization,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() moduleParameterization: ModuleParameterization,
  ): Promise<ModuleParameterization> {
    return await this.moduleParameterizationService.update(
      id,
      moduleParameterization,
    );
  }

  @Get()
  async findAll(): Promise<ModuleParameterization[]> {
    return await this.moduleParameterizationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ModuleParameterization> {
    return await this.moduleParameterizationService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(
    @Param('by') by: string,
    @Param('value') value: string,
  ): Promise<ModuleParameterization[]> {
    return await this.moduleParameterizationService.findBy(by, value);
  }
}
