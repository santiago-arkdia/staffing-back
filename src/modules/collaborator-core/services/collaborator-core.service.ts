/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {CollaboratorCore} from "../entities/collaborator-core";
import {CreateCoreDto} from "../dto/create-core.dto";

@Injectable()
export class CollaboratorCoreService {
    constructor(
        @InjectModel(CollaboratorCore.name)
        private readonly coreModel: Model<CollaboratorCore>,
    ) {
    }

    async create(collaborator: CreateCoreDto): Promise<CollaboratorCore> {
        const create = new this.coreModel(collaborator);
        return await create.save();
    }

    async update(
        id: string,
        collaborator: CreateCoreDto,
    ): Promise<CreateCoreDto> {
        return this.coreModel.findByIdAndUpdate(id, collaborator, {
            new: true,
        });
    }

    async findAll(
        by: string,
        value: string | number,
    ): Promise<CollaboratorCore[]> {
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

        return await this.coreModel
            .find(query)
            .populate({
                path: 'utilityCenter',
                populate: {
                    path: 'region',
                },
            })
            .populate({
                path: 'collaborator',
                populate: {
                    path: 'jobPosition',
                },
            })
            .populate({
                path: 'costCenter',
                populate: {
                    path: 'region',
                },
            })
            .exec();
    }

    async findOne(id: string): Promise<CollaboratorCore> {
        return await this.coreModel
            .findById(id)
            .populate({
                path: 'utilityCenter',
                populate: {
                    path: 'region',
                },
            })
            .populate({
                path: 'collaborator',
                populate: {
                    path: 'jobPosition',
                },
            })
            .populate({
                path: 'costCenter',
                populate: {
                    path: 'region',
                },
            })
            .exec();
    }

    async findBy(
        page: number,
        limit: number,
        by: string,
        value: string | number,
    ): Promise<CollaboratorCore[]> {
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

        const total = by === 'find' && value === 'all'
            ? await this.coreModel.countDocuments().exec()
            : await this.coreModel.countDocuments(query).exec();
        const totalPages = Math.ceil(total / limit);

        let search;

        if (by === 'find' && value === 'all') {
            search = await this.coreModel
                .find()
                .skip((page - 1) * limit)
                .populate({
                    path: 'utilityCenter',
                    populate: {
                        path: 'region',
                    },
                })
                .populate({
                    path: 'collaborator',
                    populate: {
                        path: 'jobPosition',
                    },
                })
                .populate({
                    path: 'costCenter',
                    populate: {
                        path: 'region',
                    },
                })
                .limit(limit)
                .exec();
        } else {
            search = await this.coreModel
                .find(query)
                .skip((page - 1) * limit)
                .populate({
                    path: 'utilityCenter',
                    populate: {
                        path: 'region',
                    },
                })
                .populate({
                    path: 'collaborator',
                    populate: {
                        path: 'jobPosition',
                    },
                })
                .populate({
                    path: 'costCenter',
                    populate: {
                        path: 'region',
                    },
                })
                .limit(limit)
                .exec();
        }

        const data = search;
        const collaborators: any = {};
        collaborators.total = total;
        collaborators.pages = totalPages;
        collaborators.data = data;

        return collaborators;
    }
}
