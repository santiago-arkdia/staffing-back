import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiagnosisService } from '../services/diagnosis.service';
import { Diagnosis } from '../entities/diagnosis.entity';
import { CreateDiagnosisDto } from '../dto/create-diagnosis.dto';

@ApiTags('Diagnosis')
@Controller('api/diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Post()
  async create(@Body() diagnosis: CreateDiagnosisDto): Promise<Diagnosis> {
    return await this.diagnosisService.create(diagnosis);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() diagnosis: Diagnosis,
  ): Promise<Diagnosis> {
    return await this.diagnosisService.update(id, diagnosis);
  }

  @Get()
  async findAll(): Promise<Diagnosis[]> {
    return await this.diagnosisService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Diagnosis> {
    return await this.diagnosisService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(
    @Param('by') by: string,
    @Param('value') value: string,
  ): Promise<Diagnosis[]> {
    return await this.diagnosisService.findBy(by, value);
  }
}
