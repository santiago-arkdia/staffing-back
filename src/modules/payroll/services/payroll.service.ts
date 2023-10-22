import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payroll } from '../entities/payroll.entity';
import { PayrollsDto } from '../dto/payroll.dto';
import { FilterPayrollDto } from '../dto/filter-payroll.dto.';

@Injectable()
export class PayrollService {
  constructor(
    @InjectModel(Payroll.name) private readonly payrollModel: Model<Payroll>,
  ) {}

  async create(payroll: PayrollsDto): Promise<Payroll> {
    const createdPayroll = new this.payrollModel(payroll);
    return await createdPayroll.save();
  }

  async update(id: string, payroll: PayrollsDto): Promise<Payroll> {
    return await this.payrollModel.findByIdAndUpdate(id, payroll, {
      new: true,
    });
  }

  async findAll(page: number, limit: number): Promise<Payroll[]> {

    const total = await this.payrollModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit)
    

    const payrolls = await this.payrollModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: 'user',
        populate: {
          path: 'role',
        },
      })
      .exec();

      let payroll: any = {};
      payroll.total = total;
      payroll.pages = totalPages;
      payroll.data = payrolls;

      return payroll;

  }

  async findOne(id: string): Promise<Payroll> {
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

  async findBy(by: string, value: string): Promise<Payroll[]> {
    const query = { [by]: value };
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

  async getPayrollByFilters(page: number, limit: number, filter: FilterPayrollDto): Promise<Payroll[]> {

    const query: any = {};

    if (filter.name) {
        query.name = { $regex: filter.name, $options: 'i' };
    }

    if (filter.lastName) {
        query.lastName = { $regex: filter.lastName, $options: 'i' };
    }

    if (filter.state) {
        query.state = filter.state;
    }

    const admins =  await this.payrollModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: 'user',
        populate: {
          path: 'role',
        },
      })
      .exec();

    const total = await this.payrollModel.countDocuments(query).exec();
    const totalPages = Math.ceil(total / limit)

    let admin: any = {};
    admin.total = total;
    admin.pages = totalPages;
    admin.data = admins;

    return admin;
  }

}
