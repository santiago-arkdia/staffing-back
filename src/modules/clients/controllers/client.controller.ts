import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { ClientService } from '../services/client.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateClientsDto } from '../dto/create-client.dto';
import { FilterClientsDto } from '../dto/filter-client.dto.';

@ApiTags('Clients')
@Controller('api/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() client: CreateClientsDto): Promise<Client> {
    client.closeBillingDate = new Date(client.closeBillingDate);
    client.premiumPaymentDate = new Date(client.premiumPaymentDate);

    return await this.clientService.create(client);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() client: Client): Promise<Client> {
    return await this.clientService.update(id, client);
  }

  @Get(':page/:limit')
  async findAll(@Param('page') page: number, @Param('limit') limit: number): Promise<Client[]> {
    return await this.clientService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    return await this.clientService.findOne(id);
  }

  @Get('by/:by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<Client[]> {
    return await this.clientService.findBy(by, value);
  }

  @Post('filters/:page/:limit')
  async findClientsByFilters(@Param('page') page: number, @Param('limit') limit: number, @Body() body: FilterClientsDto): Promise<Client[]> {
    return await this.clientService.getClientsByFilters(page, limit, body);
  }
  /*@Get(':by/:value')
  async findBy(@Param('by') by: string, @Param('value') value: string): Promise<Client[]> {
    var query = this.clientService.findBy(by, value);
    

    if (this.clientSchema.properties[by].type === 'object') {
      query = query.where(by, {
        $elemMatch: {
          [this.clientSchema.properties[by].fields[0].name]: value,
        },
      });
    }

    if (this.clientSchema.properties[by].type === 'object') {
      query = query.where(by, {
        $elemMatch: {
          [this.clientSchema.properties[by].fields[0].name]: value,
        },
      });
    }

    return await query;
  }*/
}
