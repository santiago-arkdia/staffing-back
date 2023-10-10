import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { Roles } from '../entities/roles.entity';
import { RolesService } from '../services/roles.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRolesDto } from '../dto/create-roles.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@ApiTags('Roles')
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() roles: CreateRolesDto): Promise<Roles> {
    return await this.rolesService.create(roles);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() roles: Roles): Promise<Roles> {
    return await this.rolesService.update(id, roles);
  }

  @Get()
  async findAll(): Promise<Roles[]> {
    return await this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Roles> {
    return await this.rolesService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<Roles[]> {
    return await this.rolesService.findBy(by, value);
  }
}
