import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { ClientService } from '../services/client.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateClientsDto } from '../dto/create-client.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@ApiTags('Clients')
@Controller('api/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() client: CreateClientsDto): Promise<Client> {


    return await this.clientService.create(client);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() client: Client): Promise<Client> {
    return await this.clientService.update(id, client);
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    return await this.clientService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<Client[]> {
    return await this.clientService.findBy(by, value);
  }
}
