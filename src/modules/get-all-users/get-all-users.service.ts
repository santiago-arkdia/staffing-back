import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../admin/entities/admin.entity';
import { AdminClient } from '../admin-client/entities/adminClient.entity';
import { Client } from '../clients/entities/client.entity';
import { Payroll } from '../payroll/entities/payroll.entity';

@Injectable()
export class GetAllUsersService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    @InjectModel(AdminClient.name)
    private readonly adminClientModel: Model<AdminClient>,
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(Payroll.name) private readonly payrollModel: Model<Payroll>,
  ) {}

  async getAllUsers(): Promise<any[]> {
    const admins = await this.adminModel.find().exec();
    const adminClients = await this.adminClientModel.find().exec();
    const clients = await this.clientModel.find().exec();
    const payrolls = await this.payrollModel.find().exec();

    return [...admins, ...adminClients, ...clients, ...payrolls];
  }

  async getUsersByPage(page: number, limit: number): Promise<any[]> {
    const admins = await this.adminModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('user')
      .exec();

    const clients = await this.clientModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('user')
      .exec();

    const payrolls = await this.payrollModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('user')
      .exec();

    const totalAdmins = await this.adminModel.countDocuments().exec();
    const totalClients = await this.adminModel.countDocuments().exec();
    const totalayrolls = await this.adminModel.countDocuments().exec();

    const totalPages =
      Math.ceil(totalAdmins / limit) +
      Math.ceil(totalClients / limit) +
      Math.ceil(totalayrolls / limit);

    let users: any = {};
    users.total = totalAdmins + totalClients + totalayrolls;
    users.pages = totalPages;
    (users.data = admins), clients, payrolls;

    return users;
  }
}
