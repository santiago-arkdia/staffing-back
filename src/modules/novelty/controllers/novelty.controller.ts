/* eslint-disable prettier/prettier */
import { ApiTags } from '@nestjs/swagger';
import { NoveltyService } from '../services/novelty.service';
import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { CreateNoveltyDto } from '../dto/create-novelty.dto';
import { UpdateNoveltyDto } from '../dto/update-novelty.dto';
import { Novelty } from '../entities/novelty.entity';
//import {} from '';

@ApiTags('Novelty')
@Controller('api/novelty')
export class NoveltyController {
  constructor(private readonly noveltyService: NoveltyService) {}

  @Post()
  async create(@Body() novelty: CreateNoveltyDto): Promise<Novelty> {
    novelty.initialDate = new Date(novelty.initialDate);
    novelty.finalDate = new Date(novelty.finalDate);
    return await this.noveltyService.create(novelty);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoveltyDto: UpdateNoveltyDto,
  ): Promise<UpdateNoveltyDto> {
    updateNoveltyDto.initialDate = new Date(updateNoveltyDto.initialDate);
    updateNoveltyDto.finalDate = new Date(updateNoveltyDto.finalDate);
    return await this.noveltyService.update(id, updateNoveltyDto);
  }

  @Get()
  async findAll(): Promise<Novelty[]> {
    return await this.noveltyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Novelty> {
    return await this.noveltyService.findOne(id);
  }

  @Get(':by/:value')
  async findBy(
    @Param('by') by: string,
    @Param('value') value: string,
  ): Promise<Novelty[]> {
    return await this.noveltyService.findBy(by, value);
  }
}
