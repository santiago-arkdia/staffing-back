/* eslint-disable prettier/prettier */
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model, Types} from 'mongoose';
import {CreateNoveltySocialSecurityDto} from '../dto/create-novelty-social-security.dto';
import {UpdateConceptsSocialSecurityDto} from '../dto/update-novelty-social-security.dto';
import axios, {AxiosResponse} from "axios";
import {Counter} from "../entities/counter.entity";
import {Concept} from "../../concepts/entities/concepts.entity";
import { NoveltySocialSecurity } from '../entities/novelty-social-security.entity';
import { Roles } from 'src/modules/roles/entities/roles.entity';
import { ConceptsSocialSecurity } from 'src/modules/concepts-social-security/entities/concepts-social-security.entity';
import { Client } from 'src/modules/clients/entities/client.entity';

@Injectable()
export class NoveltySocialSecurityService {
    constructor(
        @InjectModel(NoveltySocialSecurity.name) private readonly noveltySocialSecurityModel: Model<NoveltySocialSecurity>,
        @InjectModel(ConceptsSocialSecurity.name) private conceptSocialSecurityModel: Model<ConceptsSocialSecurity>,
        @InjectModel(Client.name) private client: Model<Client>,
        @InjectModel(Roles.name) private readonly rolesModel: Model<Roles>,
    ) {
    }

    async create(noveltySocialSecurity: CreateNoveltySocialSecurityDto): Promise<NoveltySocialSecurity> {

        let client = await this.client.findOne({idTri : noveltySocialSecurity.client}).select('_id').exec();

        noveltySocialSecurity.client = client._id.toString();

        const counter = await this.conceptSocialSecurityModel.findOneAndUpdate(
            {model: 'Novelty', field: 'uid'},
            {$inc: {count: 1}},
            {upsert: true, new: true},
        );

        const createdNovelty = new this.noveltySocialSecurityModel({
            //uid: counter.count,
            ...noveltySocialSecurity,
        });

        return await createdNovelty.save();
    }

    async update(id: string, updateNoveltyDto: UpdateConceptsSocialSecurityDto): Promise<UpdateConceptsSocialSecurityDto> {
        const noveltyToUpdate = await this.noveltySocialSecurityModel.findById(id);
        if (!noveltyToUpdate) {
            throw new NotFoundException('Novedad no encontrada');
        }
        const updateNovelty = await this.noveltySocialSecurityModel.findByIdAndUpdate(
            id,
            updateNoveltyDto,
            {
                new: true,
                useFindAndModify: false
            },
        );

        return updateNovelty.toObject();
    }

    async findOne(id: string): Promise<NoveltySocialSecurity> {
        return await this.noveltySocialSecurityModel.findById(id)
                .populate('collaborator')
                .populate('utilityCenter')
                .populate('centersCosts')
                .populate({
                    path: 'conceptSocialSecurity',
                    populate: {
                        path: 'categoriesSocialSecurity',
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
        roleKey: string
    ): Promise<NoveltySocialSecurity[]> {
        let query = {};
        let queryBody = {};
        let conceptList= []

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
        if (by === 'categoriesSocialSecurity') {
            conceptList = await this.conceptSocialSecurityModel.find({categoriesSocialSecurity : value}).select('_id').exec();
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

        let documents;
        const combinedQuery = {...query, ...queryBody, ...documents};
        const total = by === 'find' && value === 'all'
            ? await this.noveltySocialSecurityModel.countDocuments(combinedQuery).exec()
            : await this.noveltySocialSecurityModel.countDocuments(combinedQuery).exec();
        const totalPages = Math.ceil(total / limit);

        if (by === 'documents') {
            combinedQuery.documents = { $size: 0 };
        }

        let search;
        if (by === 'categoriesSocialSecurity') {
            search = await this.noveltySocialSecurityModel
                .find({
                    conceptSocialSecurity: { $in: conceptList },
                    //documents: { $size: 0 }
                })
                .skip((page - 1) * limit)
                .populate('collaborator')
                .populate('utilityCenter')
                .populate('centersCosts')
                .populate({
                    path: 'conceptSocialSecurity',
                    populate: {
                        path: 'categoriesSocialSecurity',
                    },
                })
                .limit(limit)
                .exec();
        } else {
            //combinedQuery.documents = { $size: 0 };
            search = await this.noveltySocialSecurityModel
                .find(combinedQuery)
                .skip((page - 1) * limit)
                .populate('collaborator')
                .populate('utilityCenter')
                .populate('centersCosts')
                .populate({
                    path: 'conceptSocialSecurity',
                    populate: {
                        path: 'categoriesSocialSecurity',
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

}
