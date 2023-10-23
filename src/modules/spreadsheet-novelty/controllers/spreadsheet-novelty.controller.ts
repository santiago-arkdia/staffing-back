import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpreadsheetNoveltyService } from '../services/spreadsheet-novelty.service';
import { CreateSpreadsheetsDto } from '../dto/create-spreadsheet-novelty.dto';
import { NoveltySpreadsheet } from '../entities/spreadsheet-novelty.entity';

@ApiTags('Spreadsheet Novelty')
@Controller('api/spreadsheet-novelty')
export class SpreadsheetNoveltyController {
  constructor(private readonly spreadsheetNovelty: SpreadsheetNoveltyService) {}

  @Post()
  async create(
    @Body() novletySpreadsheet: CreateSpreadsheetsDto,
  ): Promise<NoveltySpreadsheet> {
    return await this.spreadsheetNovelty.create(novletySpreadsheet);
  }

  @Get()
  async findAll(): Promise<NoveltySpreadsheet[]> {
    return await this.spreadsheetNovelty.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NoveltySpreadsheet> {
    return await this.spreadsheetNovelty.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<NoveltySpreadsheet> {
    return await this.spreadsheetNovelty.delete(id);
  }
}
