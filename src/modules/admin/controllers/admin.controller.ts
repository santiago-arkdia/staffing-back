import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { Admin } from '../entities/admin.entity';
import { AdminService } from '../services/admin.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateAdminsDto } from '../dto/create-admin.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@ApiTags('Administrators')
@Controller('api/admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() admin: CreateAdminsDto): Promise<Admin> {


    return await this.adminService.create(admin);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() admin: Admin): Promise<Admin> {
    return await this.adminService.update(id, admin);
  }

  @Get()
  async findAll(): Promise<Admin[]> {
    return await this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Admin> {
    return await this.adminService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<Admin[]> {
    return await this.adminService.findBy(by, value);
  }
}
