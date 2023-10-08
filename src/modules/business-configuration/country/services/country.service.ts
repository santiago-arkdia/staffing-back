import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../entities/country.entity';
import { CreateCountrysDto } from '../dto/create-country.dto';

@Injectable()
export class CountryService {
  constructor(@InjectModel(Country.name) private readonly countryModel: Model<Country>) {}

  async create(country: CreateCountrysDto): Promise<Country> {
    const createdCountry = new this.countryModel(country);
    return await createdCountry.save();
  }

  async update(id: string, country: Country): Promise<Country> {
    return await this.countryModel.findByIdAndUpdate(id, country, { new: true });
  }

  async findAll(): Promise<Country[]> {
    return await this.countryModel.find().exec();
  }

  async findOne(id: string): Promise<Country> {
    return await this.countryModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<Country[]> {
    const query = { [by]: value };
    return await this.countryModel.find(query).exec();
  }
}
