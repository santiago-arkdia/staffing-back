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
    ) {
    }

    async create(collaborator: CreateCollaboratorDto): Promise<Collaborator> {
        const createdCollaborator = new this.collaboratorModel(collaborator);
        return await createdCollaborator.save();
    }

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
            .populate({path: 'jobPosition'})
            .exec();
    }

    async findBy(
        page: number,
        limit: number,
        by: string,
        value: string | number,
    ): Promise<Collaborator[]> {
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
            ? await this.collaboratorModel.countDocuments().exec()
            : await this.collaboratorModel.countDocuments(query).exec();
        const totalPages = Math.ceil(total / limit);

        let search;

        if (by === 'find' && value === 'all') {
            search = await this.collaboratorModel
                .find()
                .skip((page - 1) * limit)
                .populate('utilityCenter')
                .populate('centersCosts')
                .limit(limit)
                .exec();
        } else {
            search = await this.collaboratorModel
                .find(query)
                .skip((page - 1) * limit)
                .populate('utilityCenter')
                .populate('centersCosts')
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
