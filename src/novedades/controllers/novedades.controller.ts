import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NovedadesService } from '../services/novedades.service';
import { NovedadDto } from '../dto/novedad.dto';

@Controller('api/novedades')
export class NovedadesController {
  constructor(private readonly novedadesService: NovedadesService) {}

  @Post()
  create(@Body() novedadDto: NovedadDto) {
    console.log(novedadDto);
    return this.novedadesService.create(novedadDto);
  }

  @Get()
  findAll() {
    return this.novedadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.novedadesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() novedadDto: NovedadDto) {
    return this.novedadesService.update(+id, novedadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.novedadesService.remove(+id);
  }
}
