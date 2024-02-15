/* eslint-disable prettier/prettier */
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model, Types} from 'mongoose';
import {CreateNoveltyRetirementDto} from '../dto/create-novelty-retirement.dto';
import {UpdateConceptsRetirementDto} from '../dto/update-novelty-retirement.dto';
import axios, {AxiosResponse} from "axios";
import {Counter} from "../entities/counter.entity";
import {Concept} from "../../concepts/entities/concepts.entity";
import { NoveltyRetirement } from '../entities/novelty-retirement.entity';
import { Roles } from 'src/modules/roles/entities/roles.entity';
import { Client } from 'src/modules/clients/entities/client.entity';

@Injectable()
export class NoveltyRetirementService {
    constructor(
        @InjectModel(NoveltyRetirement.name)
        private readonly noveltyModel: Model<NoveltyRetirement>,
        @InjectModel(Counter.name) private counterModel: Model<Counter>,
        @InjectModel(Concept.name) private conceptModel: Model<Concept>,
        @InjectModel(Roles.name) private readonly rolesModel: Model<Roles>,
        @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    ) {
    }

    async create(novelty: CreateNoveltyRetirementDto): Promise<NoveltyRetirement> {
        const counter = await this.counterModel.findOneAndUpdate(
            {model: 'Novelty', field: 'uid'},
            {$inc: {count: 1}},
            {upsert: true, new: true},
        );

        const createdNovelty = new this.noveltyModel({
            uid: counter.count,
            ...novelty,
        });

        return await createdNovelty.save();
    }

    async update(id: string, updateNoveltyDto: UpdateConceptsRetirementDto): Promise<UpdateConceptsRetirementDto> {
        const noveltyToUpdate = await this.noveltyModel.findById(id);
        if (!noveltyToUpdate) {
            throw new NotFoundException('Novedad no encontrada');
        }
        const updateNovelty = await this.noveltyModel.findByIdAndUpdate(
            id,
            updateNoveltyDto,
            {
                new: true,
                useFindAndModify: false
            },
        );

        return updateNovelty.toObject();
    }

    async findOne(id: string): Promise<NoveltyRetirement> {
        return await this.noveltyModel.findById(id)
                .populate('collaborator')
                .populate({
                    path: 'conceptsRetirement',
                    populate: {
                        path: 'categoriesRetirement',
                    },
                })
                .exec();
    }

    async findBy(
        page: number,
        limit: number,
        by: string,
        value: string | number,
        requestBodyFilters: Record<string, any> = {},
        roleKey: string,
        userId: string
    ): Promise<NoveltyRetirement[]> {
        let query = {};
        let queryBody = {};
        let conceptList= []

        let clients = await this.clientModel.find({analysts: { $in: userId }}).exec();

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
        if (by === 'category') {
            conceptList = await this.conceptModel.find({categoryNovelty: value}).select('_id').exec();
        }

        if (Object.keys(requestBodyFilters).length > 0) {
            Object.entries(requestBodyFilters).forEach(([key, val]) => {
                if (typeof val === 'string' && !isNaN(Number(val))) {
                    queryBody[key] = Number(val);
                } else if (typeof val === 'string') {
                    if (mongoose.Types.ObjectId.isValid(val)) {
                        queryBody[key] = val;
                    } else {
                        queryBody[key] = {$regex: new RegExp(val, 'i')};
                    }
                } else if (typeof val === 'number') {
                    queryBody[key] = val;
                }
            });
        }


        const combinedQuery = {...query, ...queryBody};
        combinedQuery['client'] = { '$in': clients.map(client => client._id) };
        const total = by === 'find' && value === 'all'
            ? await this.noveltyModel.countDocuments(combinedQuery).exec()
            : await this.noveltyModel.countDocuments(combinedQuery).exec();
        const totalPages = Math.ceil(total / limit);

        let search;

        if (by === 'category') {
            search = await this.noveltyModel
                .find({
                    concept: { $in: conceptList },
                    //documents: { $size: 0 }
                })
                .skip((page - 1) * limit)
                .populate('collaborator')
                .populate({
                    path: 'conceptsRetirement',
                    populate: {
                        path: 'categoriesRetirement',
                    },
                })
                .limit(limit)
                .exec();
        } else {
            //combinedQuery.documents = { $size: 0 };
            search = await this.noveltyModel
                .find(combinedQuery)
                .skip((page - 1) * limit)
                .populate('collaborator')
                .populate({
                    path: 'conceptsRetirement',
                    populate: {
                        path: 'categoriesRetirement',
                    },
                })
                .limit(limit)
                .exec();
        }

        let data = search;

        const novelties: any = {};
        novelties.total = data.length;
        novelties.pages = totalPages;
        novelties.roleKey = roleKey;
        novelties.data = data;

        return novelties;
    }


    async findBySignedByManager(
        page: number,
        limit: number,
        roleKey: string
    ): Promise<NoveltyRetirement[]> {
        let query = {};
        let queryBody = {};

        const combinedQuery = {...query, ...queryBody};
        const total = await this.noveltyModel.find({ signedByManager : 1 }).countDocuments(combinedQuery).exec()
            
        const totalPages = Math.ceil(total / limit);

        let roleKeys = await this.rolesModel.find({ ["supervisor_role"]: roleKey }).exec();
        const queryConcept = {}
         if (roleKeys.length !== 0) {
            queryConcept['approves'] = { '$in': roleKeys.map(role => role.role_key) };
        } else if (roleKey !== "client") {
            queryConcept["approves"] = roleKey;
        }


        let search = await this.noveltyModel
            .find({
                signedByManager : 1
            })
            .skip((page - 1) * limit)
            .populate('collaborator')
            .populate({
                path: 'conceptsRetirement',
                populate: {
                    path: 'categoriesRetirement',
                },
            })
            .limit(limit)
            .exec();
        
        const novelties: any = {};
        novelties.total = total;
        novelties.pages = totalPages;
        novelties.roleKey = roleKey;
        novelties.data = search;

        return novelties;
    }

    //servicio para traer novedades por el manejador que tengan signedByManager en 1 y que sea el rol legalAnlist

    //servicio para traer novedades por el manejador que tengan signedByManager en 1 y que sea el rol legalAnlist

}
