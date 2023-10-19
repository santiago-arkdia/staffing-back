import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payroll } from '../entities/payroll.entity';
import { PayrollsDto } from '../dto/payroll.dto';

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

  async findAll(): Promise<Payroll[]> {
    return await this.payrollModel.find().exec();
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
    return await this.payrollModel.find(query).exec();
  }
}
