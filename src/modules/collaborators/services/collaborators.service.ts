/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Collaborator} from '../entities/collaborators.entity';
import {Model, Types} from 'mongoose';
import {CreateCollaboratorDto} from '../dto/create-collaborators.dto';
import {UpdateCollaboratorDto} from '../dto/update-collaborators.dto';

@Injectable()
export class CollaboratorService {
    constructor(
        @InjectModel(Collaborator.name)
        private readonly collaboratorModel: Model<Collaborator>,
        /*@InjectModel(CollaboratorCore.name)
        private readonly coreModel: Model<CollaboratorCore>*/
    ) {
    }

    async create(collaborator: CreateCollaboratorDto): Promise<Collaborator> {
        const create = new this.collaboratorModel(collaborator);
        /*if (create) {
            await this.createCore({
                collaborator: create._id.toString(),
                costCenter: create.centersCosts.toString(),
                utilityCenter: create.utilityCenter.toString()
            })
        }*/
        return await create.save();
    }

   /* async createCore({ collaborator, costCenter, utilityCenter }: { collaborator: string; costCenter: string; utilityCenter: string }): Promise<CollaboratorCore> {
        const createCore = new this.coreModel({ collaborator, costCenter, utilityCenter });
        return await createCore.save();
    }*/

    async update(
        id: string,
        collaborator: UpdateCollaboratorDto,
    ): Promise<UpdateCollaboratorDto> {
        return this.collaboratorModel.findByIdAndUpdate(id, collaborator, {
            new: true,
        });
    }

    async findAll(): Promise<Collaborator[]> {
        return await this.collaboratorModel
            .find()
            .populate({
                path: 'utilityCenter',
                populate: {
                    path: 'region',
                },
            })
            .populate({
                path: 'centersCosts',
                populate: {
                    path: 'region',
                },
            })
            .populate({
                path: 'user',
                populate: {
                    path: 'role',
                },
            })
            .exec();
    }

    async findOne(id: string): Promise<Collaborator> {
        return await this.collaboratorModel
            .findById(id)
            .populate({
                path: 'utilityCenter',
                populate: {
                    path: 'region',
                },
            })
            .populate({
                path: 'centersCosts',
                populate: {
                    path: 'region',
                },
            })
            .populate({
                path: 'jobPosition',
                populate: {
                    path: 'region',
                },
            })
            .populate({
                path: 'user',
                populate: {
                    path: 'role',
                },
            })
            .exec();
    }

    async findBy(
        page: number,
        limit: number,
        by: string,
        value: string | number,
        asigned: string | number,
        request: Record<string, any>
    ): Promise<Collaborator[]> {
        let query = {};
        let querAsigned = {};

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

        if (request['user'].roleKey == "client"){
            querAsigned["client"] = request['user'].userEntity;
        }

        if ( asigned != null) {
            if (asigned == "asigned"){
                querAsigned["$and"] = [
                    { jobPosition: { $exists: false } },
                    { $or: [
                        { centersCosts: { $exists: false } },
                        { utilityCenter: { $exists: false } }
                    ]}
                ];
            }else{
                querAsigned["$and"] = [
                    { jobPosition: { $exists: true } },
                    { $or: [
                        { centersCosts: { $exists: true } },
                        { utilityCenter: { $exists: true } }
                    ]}
                ];
            }
        }

        const total = by === 'find' && value === 'all'
            ? await this.collaboratorModel.countDocuments(querAsigned).exec()
            : await this.collaboratorModel.countDocuments(query, querAsigned).exec();
        const totalPages = Math.ceil(total / limit);

        let queryBuilder;
        if (by === 'find' && value === 'all') {
            queryBuilder = this.collaboratorModel.find(querAsigned);
        }else{
            queryBuilder = this.collaboratorModel.find(query, querAsigned);
        }

        queryBuilder = queryBuilder.populate('utilityCenter').populate('centersCosts').populate('jobPosition');
        
        if (page > 0 && limit > 0) {
            queryBuilder = queryBuilder.skip((page - 1) * limit).limit(limit);
        }

        const data = await queryBuilder.exec();
        const collaborators: any = {};
        collaborators.total = total;
        collaborators.pages = totalPages;
        collaborators.data = data;

        return collaborators;
    }
}
