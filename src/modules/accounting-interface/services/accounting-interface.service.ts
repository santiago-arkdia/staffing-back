import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountingInterface } from '../entities/accounting-interface.entity';
import { Model, Types } from 'mongoose';
import { CreateAccountingInterfaceDto } from '../dto/create-accounting-interface.dto';
import { UpdateAccountingInterfaceDto } from '../dto/update-accounting-interface.dto';
import { FilterInterfaceDto } from '../dto/filter-accounting.dtos';

@Injectable()
export class AccountingInterfaceService {
  constructor(@InjectModel(AccountingInterface.name) private readonly accountingInterfaceModel: Model<AccountingInterface>) { }

  async create(eps: CreateAccountingInterfaceDto): Promise<AccountingInterface> {
    const createdAccountingInterface = new this.accountingInterfaceModel(eps);
    return await createdAccountingInterface.save();
  }

  async update(id: string, eps: UpdateAccountingInterfaceDto): Promise<AccountingInterface> {
    return await this.accountingInterfaceModel.findByIdAndUpdate(id, eps, { new: true });
  }

  // async findAll(params?: FilterInterfaceDto): Promise<AccountingInterface[]> {
  //   const { limit = params.limit, page = 1, order = params.order, ...filters } = params;
  //   const offset = (page - 1) * limit;
  //   const accountingInterfaces = await this.accountingInterfaceModel
  //       .find(filters)
  //       .populate("client")
  //       .skip(offset)
  //       .limit(limit)
  //       .sort({ createdAt: order === 'asc' ? 1 : -1 })
  //       .exec();


  //   const total = await this.accountingInterfaceModel.find(filters).countDocuments().exec();

  //   const accountingInterface: any = {};
  //   accountingInterface.total = total;
  //   accountingInterface.data = accountingInterfaces;

  //   return accountingInterface;
  // }

  async findBy(
    page: number, 
    limit: number, 
    by: string,
    value: string | number
  ): Promise<AccountingInterface[]> {

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
        ? await this.accountingInterfaceModel.countDocuments().exec()
        : await this.accountingInterfaceModel.countDocuments(query).exec();
    const totalPages = Math.ceil(total / limit);

    let queryBuilder

    if (by === 'find' && value === 'all') {
      queryBuilder = this.accountingInterfaceModel.find();
    }else{
      queryBuilder = this.accountingInterfaceModel.find(query);
    }

    if (page > 0 && limit > 0) {
      queryBuilder = queryBuilder.skip((page - 1) * limit).limit(limit);
    }

    const AccountingInterfaceData = await queryBuilder.exec();

    const AccountingInterface: any = {};
    AccountingInterface.total = total;
    AccountingInterface.pages = totalPages;
    AccountingInterface.data = AccountingInterfaceData;

    return AccountingInterface
  }

  async findOne(id: string): Promise<AccountingInterface> {
    return await this.accountingInterfaceModel
      .findById(id)
      .populate("client")
      .exec();
  }

  // async findBy(by: string, value: string): Promise<AccountingInterface[]> {
  //   const query = { [by]: value };
  //   return await this.accountingInterfaceModel.find(query).exec();
  // }
}
