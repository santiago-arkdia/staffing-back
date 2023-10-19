import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { Admin } from '../entities/admin.entity';
import { AdminService } from '../services/admin.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminsDto } from '../dto/admin.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@ApiTags('Administrators')
@Controller('api/admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() admin: AdminsDto): Promise<Admin> {
    return await this.adminService.create(admin);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() admin: AdminsDto): Promise<Admin> {
    return await this.adminService.update(id, admin);
  }

  @Get(':page/:limit')
  async findAll(@Param('page') page: number, @Param('limit') limit: number):Promise<Admin[]> {
    return await this.adminService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Admin> {
    return await this.adminService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<Admin[]> {
    return await this.adminService.findBy(by, value, null);
  }

  @Get(':by/:value/:key')
  async findByKey(@Param('by') by: string, @Param('value') value: string, @Param('key') key: string): Promise<Admin[]> {
    return await this.adminService.findBy(by, value, key);
  }

  @Post('findbyquery')
  async findByQuery(@Body() query: []): Promise<Admin[]> {
    console.log(query);
    return await this.adminService.findByQuery(query);
  }
}
