/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Concept} from './../entities/concepts.entity';
import {CreateConceptsDto} from '../dto/create-concepts.dto';
import {CostCenters} from "../../business-configuration/centers-costs/entities/centers-costs.entity";

@Injectable()
export class ConceptsService {
    constructor(
        @InjectModel(Concept.name)
        private readonly conceptModel: Model<Concept>,
    ) {
    }

    async create(concept: CreateConceptsDto): Promise<Concept> {
        // console.log(concept);
        const createdConcept = new this.conceptModel(concept);
        return await createdConcept.save();
    }

    async update(id: string, concept: CreateConceptsDto): Promise<Concept> {
        return this.conceptModel.findByIdAndUpdate(id, concept);
    }

    async findAll(): Promise<Concept[]> {
        return await this.conceptModel.find().exec();
    }

    async findOne(id: string): Promise<Concept> {
        return await this.conceptModel.findById(id).exec();
    }
    async findBy(
        by: string,
        value: string | number,
        typeNovelty: string
    ): Promise<Concept[]> {
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
                ? await this.conceptModel.countDocuments({typeNovelty: typeNovelty}).exec()
                : await this.conceptModel.countDocuments({typeNovelty: typeNovelty}, query).exec();

        let queryBuilder

        if (by === 'find' && value === 'all') {
            queryBuilder = this.conceptModel.find({typeNovelty: typeNovelty});
        }else{
            queryBuilder = this.conceptModel.find({typeNovelty: typeNovelty}, query);
        }

        queryBuilder = queryBuilder.populate('categoryNovelty');
        const data = await queryBuilder.exec();

        const concepts: any = {};
        concepts.total = total;
        concepts.data = data;

        return concepts;
    }
}
