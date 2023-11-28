/* eslint-disable prettier/prettier */
import {Controller, Post, Put, Get, Param, Body, Delete} from '@nestjs/common';
import {Country} from '../entities/country.entity';
import {CountryService} from '../services/country.service';
import {ApiTags} from '@nestjs/swagger';
import {CreateCountriesDto} from '../dto/create-country.dto';

@ApiTags('Countries')
@Controller('api/country')
export class CountryController {
    constructor(private readonly countryService: CountryService) {
    }

    @Post()
    async create(@Body() country: CreateCountriesDto): Promise<Country> {
        return await this.countryService.create(country);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() country: CreateCountriesDto,
    ): Promise<Country> {
        return await this.countryService.update(id, country);
    }

    @Get()
    async findAll(): Promise<Country[]> {
        return await this.countryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Country> {
        return await this.countryService.findOne(id);
    }

    @Get(':page/:limit/:by/:value')
    async findBy(
        @Param('page') page: number,
        @Param('limit') limit: number,
        @Param('by') by: string,
        @Param('value') value: string,
    ): Promise<Country[]> {
        return await this.countryService.findBy(page, limit, by, value);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Country> {
        return await this.countryService.delete(id);
    }
}
