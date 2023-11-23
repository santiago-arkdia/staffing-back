/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Payroll} from '../entities/payroll.entity';
import {PayrollsDto} from '../dto/payroll.dto';
import {FilterPayrollDto} from '../dto/filter-payroll.dto.';
import {CategoriesNovelty} from "../../categories-novelty/entities/categories-novelties.entity";

@Injectable()
export class PayrollService {
    constructor(
        @InjectModel(Payroll.name) private readonly payrollModel: Model<Payroll>,
    ) {
    }

    async create(payroll: PayrollsDto): Promise<Payroll> {
        const createdPayroll = new this.payrollModel(payroll);
        return await createdPayroll.save();
    }

    async update(id: string, payroll: PayrollsDto): Promise<Payroll> {
        return this.payrollModel.findByIdAndUpdate(id, payroll, {
            new: true,
        });
    }

    async findAll(): Promise<Payroll[]> {
        const total = await this.payrollModel.countDocuments().exec();
        const payrolls = await this.payrollModel.find()
            .populate({
                path: 'user',
                populate: {
                    path: 'role',
                },
            })
            .exec();

        const payroll: any = {};
        payroll.total = total;
        payroll.data = payrolls;

        return payroll;
    }

    async findOne(id: any): Promise<Payroll> {
        return await this.payrollModel
            .findById(id)
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
    ): Promise<Payroll[]> {
        let query = {};

        if (by !== 'find' && value !== 'all') {
            if (typeof value === 'string' && !isNaN(Number(value))) {
                query = { [by]: Number(value) };
            } else if (typeof value === 'string') {
                if (Types.ObjectId.isValid(value)) {
                    query = { [by]: value };
                } else {
                    query = { [by]: { $regex: new RegExp(value, 'i') } };
                }
            } else if (typeof value === 'number') {
                query = { [by]: value };
            }
        }

        const total = by === 'find' && value === 'all'
            ? await this.payrollModel.countDocuments().exec()
            : await this.payrollModel.countDocuments(query).exec();
        const totalPages = Math.ceil(total / limit);

        let search;

        if (by === 'find' && value === 'all') {
            search = this.payrollModel
                .find()
                .skip((page - 1) * limit)
                .populate({
                    path: 'user',
                    populate: {
                        path: 'role',
                    },
                })
                .limit(limit)
                .exec();
        } else {
            search = this.payrollModel
                .find(query)
                .skip((page - 1) * limit)
                .populate({
                    path: 'user',
                    populate: {
                        path: 'role',
                    },
                })
                .limit(limit)
                .exec();
        }

        const data = await search;

        const payrolls: any = {};
        payrolls.total = total;
        payrolls.pages = totalPages;
        payrolls.data = data;

        return payrolls;
    }
}
