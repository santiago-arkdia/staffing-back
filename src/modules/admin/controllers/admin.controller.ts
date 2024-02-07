import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { Admin } from '../entities/admin.entity';
import { AdminService } from '../services/admin.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminsDto } from '../dto/admin.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { FilterAdminsDto } from '../dto/filter-admin.dto.';

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

  @Get('')
  async getAll():Promise<Admin[]> {
    return await this.adminService.getAll();
  }


  @Get(':page/:limit')
  async findAll(@Param('page') page: number, @Param('limit') limit: number):Promise<Admin[]> {
    return await this.adminService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Admin> {
    return await this.adminService.findOne(id);
  }

  @Get('by/:by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<Admin[]> {
    return await this.adminService.findBy(by, value, null);
  }

  @Get('by/:by/:value/:key')
  async findByKey(@Param('by') by: string, @Param('value') value: string, @Param('key') key: string): Promise<Admin[]> {
    return await this.adminService.findBy(by, value, key);
  }

  @Post('filters/:page/:limit')
  async findAdminsByFilters(@Param('page') page: number, @Param('limit') limit: number, @Body() admin: FilterAdminsDto): Promise<Admin[]> {
    if (admin && Object.keys(admin).length > 0) {
      return await this.adminService.getAdminsByFilters(page, limit, admin);
    }else{
      return await this.adminService.findAll(page, limit);
    }
  }
}
