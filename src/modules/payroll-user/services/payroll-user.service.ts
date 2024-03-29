/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Payroll} from '../entities/payroll-user.entity';
import {PayrollUsersDto} from '../dto/payroll-user.dto';
import {FilterPayrollUserDto} from '../dto/filter-payroll-user.dto.';
import {CategoriesNovelty} from "../../categories-novelty/entities/categories-novelties.entity";

@Injectable()
export class PayrollUserService {
    constructor(
        @InjectModel(Payroll.name) private readonly payrollModel: Model<Payroll>,
    ) {
    }

    async create(payroll: PayrollUsersDto): Promise<Payroll> {
        const createdPayrollUser = new this.payrollModel(payroll);
        return await createdPayrollUser.save();
    }

    async update(id: string, payroll: PayrollUsersDto): Promise<Payroll> {
        return this.payrollModel.findByIdAndUpdate(id, payroll, {
            new: true,
        });
    }

    async findBy(by: string, value: string, key: string): Promise<Payroll[]> {
        if (key) {
            const query = {
                [key]: {
                    $elemMatch: {
                        [by]: value,
                    },
                },
            };
            return await this.payrollModel
                .find(query)
                .populate({
                    path: 'user',
                    populate: {
                        path: 'role',
                    },
                })
                .exec();
        } else {
            const query = {[by]: value};
            return await this.payrollModel
                .find(query)
                .populate({
                    path: 'user',
                    populate: {
                        path: 'role',
                    },
                })
                .exec();
        }
    }

    async findAll(): Promise<Payroll[]> {

        console.log(this.payrollModel);

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

    async findByFilters(
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
