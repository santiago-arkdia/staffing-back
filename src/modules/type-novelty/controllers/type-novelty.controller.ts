import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TypeNoveltyService } from '../services/type-novelty.service';
import { CreateTypeNoveltyDto } from '../dto/create-type-novelty.dto';
import { TypeNovelty } from '../entities/type-novelty.entity';

@ApiTags('Type Novelty')
@Controller('api/type-novelty')
export class TypeNoveltyController {
  constructor(private readonly typeNovelty: TypeNoveltyService) {}

  @Post()
  async create(
    @Body() novletyType: CreateTypeNoveltyDto,
  ): Promise<TypeNovelty> {
    return await this.typeNovelty.create(novletyType);
  }

  @Get()
  async findAll(): Promise<TypeNovelty[]> {
    return await this.typeNovelty.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TypeNovelty> {
    return await this.typeNovelty.findOne(id);
  }

  @Get(':by/:value')
  async findBy(
    @Param('by') by: string,
    @Param('value') value: string,
  ): Promise<TypeNovelty[]> {
    return await this.typeNovelty.findBy(by, value, null);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<TypeNovelty> {
    return await this.typeNovelty.delete(id);
  }
}
