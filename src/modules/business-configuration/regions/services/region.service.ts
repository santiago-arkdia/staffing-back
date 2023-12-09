/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Region} from '../entities/region.entity';
import {CreateRegionDto} from '../dto/create-region.dto';

@Injectable()
export class RegionService {
    constructor(
        @InjectModel(Region.name) private readonly regionModel: Model<Region>,
    ) {
    }

    async create(region: CreateRegionDto): Promise<Region> {
        const createdRegion = new this.regionModel(region);
        return await createdRegion.save();
    }

    async update(id: string, region: CreateRegionDto): Promise<Region> {
        return this.regionModel.findByIdAndUpdate(id, region, {new: true});
    }

    async findAll(): Promise<Region[]> {
        const total = await this.regionModel.countDocuments().exec();
        const region = await this.regionModel.find().populate('country').exec();

        const regions: any = {};
        regions.total = total;
        regions.data = region;

        return regions;
    }

    async findOne(id: string): Promise<Region> {
        return await this.regionModel.findById(id).exec();
    }

    async findBy(
        page: number,
        limit: number,
        by: string,
        value: string | number,
    ): Promise<Region[]> {
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
                ? await this.regionModel.countDocuments().exec()
                : await this.regionModel.countDocuments(query).exec();
        const totalPages = Math.ceil(total / limit);

        let queryBuilder

        if (by === 'find' && value === 'all') {
            queryBuilder = this.regionModel.find();
        }else{
            queryBuilder = this.regionModel.find(query);
        }

        queryBuilder = queryBuilder.populate('country')

        if (page > 0 && limit > 0) {
            queryBuilder = queryBuilder.skip((page - 1) * limit).limit(limit);
        }

        const data = await queryBuilder.exec();

        const regions: any = {};
        regions.total = total;
        regions.pages = totalPages;
        regions.data = data;

        return regions;

    }

    async delete(id: string): Promise<Region> {
        return await this.regionModel.findByIdAndDelete(id).exec();
    }
}
