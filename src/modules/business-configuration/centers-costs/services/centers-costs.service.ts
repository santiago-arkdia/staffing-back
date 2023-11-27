/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {CreateCentersCostsDto} from '../dto/create-centers-costs.dto';
import {CostCenters} from '../entities/centers-costs.entity';

@Injectable()
export class CentersCostsService {
    constructor(
        @InjectModel(CostCenters.name)
        private readonly centersCostsModel: Model<CostCenters>,
    ) {
    }

    async create(centersCosts: CreateCentersCostsDto): Promise<CostCenters> {
        const createdCentersCosts = new this.centersCostsModel(centersCosts);
        return await createdCentersCosts.save();
    }

    async update(id: string, centersCosts: CreateCentersCostsDto): Promise<CostCenters> {
        return this.centersCostsModel.findByIdAndUpdate(id, centersCosts, {
            new: true,
        });
    }

    async findAll(): Promise<CostCenters[]> {
        const total = await this.centersCostsModel.countDocuments().exec();
        const centersCost = await this.centersCostsModel
            .find()
            .populate('region')
            .exec();

        const centersCosts: any = {};
        centersCosts.total = total;
        centersCosts.data = centersCost;

        return centersCosts;
    }

    async findOne(id: string): Promise<CostCenters> {
        return await this.centersCostsModel.findById(id).exec();
    }

    async findBy(
        page: number,
        limit: number,
        by: string,
        value: string | number,
    ): Promise<CostCenters[]> {
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
                ? await this.centersCostsModel.countDocuments().exec()
                : await this.centersCostsModel.countDocuments(query).exec();
        const totalPages = Math.ceil(total / limit);

        let search;
        if (by === 'find' && value === 'all') {
            search = await this.centersCostsModel
                .find()
                .skip((page - 1) * limit)
                .populate('region')
                .limit(limit)
                .exec();
        } else {
            search = await this.centersCostsModel
                .find(query)
                .skip((page - 1) * limit)
                .populate('region')
                .limit(limit)
                .exec();
        }

        const data = search;
        const regions: any = {};
        regions.total = total;
        regions.pages = totalPages;
        regions.data = data;

        return regions;
    }

    async delete(id: string): Promise<CostCenters> {
        return await this.centersCostsModel.findByIdAndDelete(id).exec();
    }
}
