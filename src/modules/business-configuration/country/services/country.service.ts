import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../entities/country.entity';
import { CreateCountrysDto } from '../dto/create-country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
  ) {}

  async create(country: CreateCountrysDto): Promise<Country> {
    const createdCountry = new this.countryModel(country);
    return await createdCountry.save();
  }

  async update(id: string, country: Country): Promise<Country> {
    return this.countryModel.findByIdAndUpdate(id, country, {
      new: true,
    });
  }

  async findAll(page: number, limit: number): Promise<Country[]> {
    const total = await this.countryModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit);

    const country = await this.countryModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const countries: any = {};
    countries.total = total;
    countries.pages = totalPages;
    countries.data = country;

    return countries;
  }

  async findOne(id: string): Promise<Country> {
    return await this.countryModel.findById(id).exec();
  }

  async findBy(
    page: number,
    limit: number,
    by: string,
    value: string,
  ): Promise<Country[]> {
    const query = { [by]: { $regex: new RegExp(value, 'i') } };

    const total = await this.countryModel.countDocuments(query).exec();
    const totalPages = Math.ceil(total / limit);

    const country = await this.countryModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const countries: any = {};
    countries.total = total;
    countries.pages = totalPages;
    countries.data = country;

    return countries;
  }
}
