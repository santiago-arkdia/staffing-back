import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccountingInterface } from '../entities/accounting-interface.entity';
import { Model } from 'mongoose';
import { CreateAccountingInterfaceDto } from '../dto/create-accounting-interface.dto';
import { UpdateAccountingInterfaceDto } from '../dto/update-accounting-interface.dto';

@Injectable()
export class AccountingInterfaceService {
  constructor(@InjectModel(AccountingInterface.name) private readonly accountingInterfaceModel: Model<AccountingInterface>) {}

  async create(eps: CreateAccountingInterfaceDto): Promise<AccountingInterface> {
    const createdAccountingInterface = new this.accountingInterfaceModel(eps);
    return await createdAccountingInterface.save();
  }

  async update(id: string, eps: AccountingInterface): Promise<UpdateAccountingInterfaceDto> {
    return await this.accountingInterfaceModel.findByIdAndUpdate(id, eps, { new: true });
  }

  async findAll(): Promise<AccountingInterface[]> {
    const total = await this.accountingInterfaceModel.countDocuments().exec();
    const accountingInterfaces = await this.accountingInterfaceModel
        .find()
        .populate("client")
        .exec();

    const accountingInterface: any = {};
    accountingInterface.total = total;
    accountingInterface.data = accountingInterfaces;

    return accountingInterface;
  }

  async findOne(id: string): Promise<AccountingInterface> {
    return await this.accountingInterfaceModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<AccountingInterface[]> {
    const query = { [by]: value };
    return await this.accountingInterfaceModel.find(query).exec();
  }
}
