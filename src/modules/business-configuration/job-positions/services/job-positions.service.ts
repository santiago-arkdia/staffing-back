/* eslint-disable prettier/prettier */
import {Injectable, UseGuards} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {CreateJobPositionsDto} from '../dto/job-positions.dto';
import {JobPositions} from '../entities/job-positions.entity';
import { AuthExternalGuard } from 'src/modules/auth/auth-external.guard';
import { UpdateJobPositionsDto } from '../dto/update-job-positions.dto';

@Injectable()
export class JobPositionsService {
    constructor(
        @InjectModel(JobPositions.name)
        private readonly jobPositionsModel: Model<JobPositions>,
    ) {
    }

    async create(jobPositions: CreateJobPositionsDto): Promise<JobPositions> {
        const createdJobPositions = new this.jobPositionsModel(jobPositions);
        return await createdJobPositions.save();
    }

    async update(id: string, jobPositions: UpdateJobPositionsDto): Promise<JobPositions> {
        return this.jobPositionsModel.findByIdAndUpdate(id, jobPositions, {
            new: true,
        });
    }

    async findAll(): Promise<JobPositions[]> {
        const total = await this.jobPositionsModel.countDocuments().exec();

        const jobPosition = await this.jobPositionsModel
            .find()
            .populate('region')
            .populate('utilityCenter')
            .populate('centersCosts')
            .populate('hourlyMeshes')
            .exec();

        const jobPositions: any = {};
        jobPositions.total = total;
        jobPositions.data = jobPosition;
        return jobPositions;
    }

    async findOne(id: string): Promise<JobPositions> {
        return await this.jobPositionsModel.findById({idTry: id})
                .populate('region')
                .populate('utilityCenter')
                .populate('centersCosts')
                .populate({
                    path: 'hourlyMeshes',
                    populate: {
                        path: 'schedules',
                    },
                })
                .exec();
    }

    async findBy(
        page: number,
        limit: number,
        by: string,
        value: string | number,
    ): Promise<JobPositions[]> {
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
            ? await this.jobPositionsModel.countDocuments().exec()
            : await this.jobPositionsModel.countDocuments(query).exec();
        const totalPages = Math.ceil(total / limit);

        let search;

        if (by === 'find' && value === 'all') {
            search = await this.jobPositionsModel
                .find()
                .skip((page - 1) * limit)
                .populate('region')
                .populate('utilityCenter')
                .populate('centersCosts')
                .populate('hourlyMeshes')
                .limit(limit)
                .exec();
        } else {
            search = await this.jobPositionsModel
                .find(query)
                .skip((page - 1) * limit)
                .populate('region')
                .populate('utilityCenter')
                .populate('centersCosts')
                .populate('hourlyMeshes')
                .limit(limit)
                .exec();
        }

        const data = search;
        const jobPositions: any = {};
        jobPositions.total = total;
        jobPositions.pages = totalPages;
        jobPositions.data = data;

        return jobPositions;
    }

    async getAll(): Promise<JobPositions[]> {

        const jobPosition = await this.jobPositionsModel
            .find()
            .populate('region')
            .populate('utilityCenter')
            .populate('centersCosts')
            .populate('hourlyMeshes')
            .exec();

        return jobPosition;
    }

    async delete(id: string): Promise<JobPositions> {
        return await this.jobPositionsModel.findByIdAndDelete(id).exec();
    }
}
