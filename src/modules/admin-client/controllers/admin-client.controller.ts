/* eslint-disable prettier/prettier */
import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { AdminClient } from '../entities/adminClient.entity';
import { ClientService } from '../services/adminClient.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateClientsDto } from '../dto/create-adminClient.dto';
import { FilterAdminClientsDto } from '../dto/filter-admin.dto.';
import {UpdateAdminClientsDto} from "../dto/update-admin-client.dto";

@ApiTags('Admin Clients')
@Controller('api/admin-client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() client: CreateClientsDto): Promise<AdminClient> {
    return await this.clientService.create(client);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() client: UpdateAdminClientsDto,
  ): Promise<UpdateAdminClientsDto> {
    return await this.clientService.update(id, client);
  }

  @Get(':page/:limit')
  async findAll(@Param('page') page: number, @Param('limit') limit: number):Promise<AdminClient[]> {
    return await this.clientService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AdminClient> {
    return await this.clientService.findOne(id);
  }

  @Get('by/:by/:value')
  async findBy(
    @Param('by') by: string,
    @Param('value') value: string,
  ): Promise<AdminClient[]> {
    return await this.clientService.findBy(by, value);
  }

  @Post('filters/:page/:limit')
  async findAdminsClientsByFilters(@Param('page') page: number, @Param('limit') limit: number, @Body() adminClient: FilterAdminClientsDto): Promise<AdminClient[]> {
    if (adminClient && Object.keys(adminClient).length > 0) {
      return await this.clientService.getAdminsClientsByFilters(page, limit, adminClient);
    }else{
      return await this.clientService.findAll(page, limit);
    }
  }
}
