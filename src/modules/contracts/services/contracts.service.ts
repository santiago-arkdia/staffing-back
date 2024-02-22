/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Contract} from '../entities/contracts.entity';

@Injectable()
export class ContractsService {
    constructor(
        @InjectModel(Contract.name)
        private readonly conceptModel: Model<Contract>,
    ) {
    }
    
    async findAll(): Promise<Contract[]> {
        return await this.conceptModel.find().exec();
    }

    async findOne(id: string): Promise<Contract> {
        return await this.conceptModel.findById(id).exec();
    }
    async findBy(
        by: string,
        value: string | number
    ): Promise<Contract[]> {
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
                ? await this.conceptModel.countDocuments().exec()
                : await this.conceptModel.countDocuments(query).exec();

        let queryBuilder

        if (by === 'find' && value === 'all') {
            queryBuilder = this.conceptModel.find();
        }else{
            queryBuilder = this.conceptModel.find(query);
        }

        queryBuilder = queryBuilder.populate('categoryNovelty');
        const data = await queryBuilder.exec();

        const contracts: any = {};
        contracts.total = total;
        contracts.data = data;

        return contracts;
    }
}
