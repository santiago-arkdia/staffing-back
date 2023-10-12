/* eslint-disable prettier/prettier */
import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { AdminClient } from '../entities/adminClient.entity';
import { ClientService } from '../services/adminClient.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateClientsDto } from '../dto/create-adminClient.dto';

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
    @Body() client: AdminClient,
  ): Promise<AdminClient> {
    return await this.clientService.update(id, client);
  }

  @Get()
  async findAll(): Promise<AdminClient[]> {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AdminClient> {
    return await this.clientService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(
    @Param('by') by: string,
    @Param('value') value: string,
  ): Promise<AdminClient[]> {
    return await this.clientService.findBy(by, value);
  }
}