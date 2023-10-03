/* eslint-disable prettier/prettier */
// services.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  // UseGuards,
} from '@nestjs/common';
import { ServicesService } from './../services/user-services.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
// import { AdminGuard } from 'src/auth/admin.guard';

@ApiBearerAuth()
@ApiTags('Servicios-usuarios')
@Controller('api/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // @UseGuards(AdminGuard) 
  @Get()
  async findAll() {
    console.log("Fin all services")
    const services = await this.servicesService.findAll();
    return { services };
  }

  // @UseGuards(AdminGuard)
  @Get(':role')
  async findByRole(@Param('role') role: string) {
    const services = await this.servicesService.findByRole(role);
    return { services };
  }

  // @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    const existingService = await this.servicesService.findByRole(
      createServiceDto.role,
    );

    if (existingService && existingService.length > 0) {
      throw new HttpException(
        'Ya existe un servicio con este rol',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.servicesService.createService(createServiceDto);
  }

  // @UseGuards(AdminGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: CreateServiceDto,
  ) {
    const existingService = await this.servicesService.findById(id);
    if (!existingService) {
      throw new NotFoundException(
        `El servicio con el ID ${id} no se encontró.`,
      );
    }
    const updatedService = await this.servicesService.updateService(
      id,
      updateServiceDto,
    );
    return updatedService;
  }

  // @UseGuards(AdminGuard)
  @Delete(':role')
  async remove(@Param('role') role: string) {
    const existingService = await this.servicesService.findByRole(role);
    if (!existingService) {
      throw new NotFoundException(
        `El servicio con el ID ${role} no se encontró.`,
      );
    }
    await this.servicesService.removeService(role);
    return `El servicio con el ID ${role} ha sido eliminado correctamente.`;
  }
}
