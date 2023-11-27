/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Country} from '../entities/country.entity';
import {CreateCountriesDto} from '../dto/create-country.dto';
import {CostCenters} from "../../centers-costs/entities/centers-costs.entity";

@Injectable()
export class CountryService {
    constructor(
        @InjectModel(Country.name) private readonly countryModel: Model<Country>,
    ) {
    }

    async create(country: CreateCountriesDto): Promise<Country> {
        const createdCountry = new this.countryModel(country);
        return await createdCountry.save();
    }

    async update(id: string, country: CreateCountriesDto): Promise<Country> {
        return this.countryModel.findByIdAndUpdate(id, country, {
            new: true,
        });
    }

    async findAll(): Promise<Country[]> {
        const total = await this.countryModel.countDocuments().exec();
        const country = await this.countryModel.find().exec();

        const countries: any = {};
        countries.total = total;
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
        value: string | number,
    ): Promise<Country[]> {
        let query = {};

        if (by !== 'find' && value !== 'all') {
            if (typeof value === 'string' && !isNaN(Number(value))) {
                query = {[by]: Number(value)};
            } else if (typeof value === 'string') {
                if (Types.ObjectId.isValid(value)) {
                    query = {[by]: value};
                } else {
                    query = {[by]: {$regex: new RegExp(value, 'i')}};
                }
            } else if (typeof value === 'number') {
                query = {[by]: value};
            }
        }

        const total =
            by === 'find' && value === 'all'
                ? await this.countryModel.countDocuments().exec()
                : await this.countryModel.countDocuments(query).exec();
        const totalPages = Math.ceil(total / limit);

        let search;
        if (by === 'find' && value === 'all') {
            search = await this.countryModel
                .find()
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
        } else {
            search = await this.countryModel
                .find(query)
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
        }

        const data = search;
        const countries: any = {};
        countries.total = total;
        countries.pages = totalPages;
        countries.data = data;

        return countries;
    }
    async delete(id: string): Promise<Country> {
        return await this.countryModel.findByIdAndDelete(id).exec();
    }
}
