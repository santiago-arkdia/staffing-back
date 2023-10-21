import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../admin/entities/admin.entity';
import { AdminClient } from '../admin-client/entities/adminClient.entity';
import { Client } from '../clients/entities/client.entity';
import { Payroll } from '../payroll/entities/payroll.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class GetAllUsersService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    @InjectModel(AdminClient.name)
    private readonly adminClientModel: Model<AdminClient>,
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(Payroll.name) private readonly payrollModel: Model<Payroll>,
    @InjectModel(Payroll.name) private readonly userModel: Model<UserEntity>,
  ) {}

  async getAllUsers(): Promise<any[]> {
    const admins = await this.adminModel.find().exec();
    const adminClients = await this.adminClientModel.find().exec();
    const clients = await this.clientModel.find().exec();
    const payrolls = await this.payrollModel.find().exec();

    return [...admins, ...adminClients, ...clients, ...payrolls];
  }

  async getUsersByPage(page: number, limit: number): Promise<any[]> {


    const usersWithRelatedData = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'admins',
          localField: '_id',
          foreignField: 'user',
          as: 'admins',
        },
      },
      {
        $lookup: {
          from: 'clients',
          localField: '_id',
          foreignField: 'user',
          as: 'clients',
        },
      },
      {
        $lookup: {
          from: 'payrolls', 
          localField: '_id',
          foreignField: 'user',
          as: 'payrolls',
        },
      },
    ]).allowDiskUse(true);


    return usersWithRelatedData;
    


    const admins = await this.adminModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: 'user',
        populate: {
          path: 'role',
        },
      })
      .exec();

    const clients = await this.clientModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: 'user',
        populate: {
          path: 'role',
        },
      })
      .exec();

    const payrolls = await this.payrollModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: 'user',
        populate: {
          path: 'role',
        },
      })
      .exec();

    const totalAdmins = await this.adminModel.countDocuments().exec();
    const totalClients = await this.adminModel.countDocuments().exec();
    const totalayrolls = await this.adminModel.countDocuments().exec();

    const totalPages =
      Math.ceil(totalAdmins / limit) +
      Math.ceil(totalClients / limit) +
      Math.ceil(totalayrolls / limit);

    const createdAtComparator = (a, b) => {
      return a.createdAt - b.createdAt;
    };

    let users: any = {};
    users.total = totalAdmins + totalClients + totalayrolls;
    users.pages = totalPages;
    users.data = [...admins, ...clients, ...payrolls];
    users.data.sort(createdAtComparator);


    return users;
  }


  async getUsersByPageFilterDocumentName(page: number, limit: number, document: number, name: string): Promise<any[]> {

    const query = { 
      ["documentNumber"]: document,
      ["name"]: name
    };

    const admins = await this.adminModel
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

    const clients = await this.clientModel
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

    const payrolls = await this.payrollModel
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

    const totalAdmins = await this.adminModel.countDocuments(query).exec();
    const totalClients = await this.adminModel.countDocuments(query).exec();
    const totalayrolls = await this.adminModel.countDocuments(query).exec();

    const totalPages =
      Math.ceil(totalAdmins / limit) +
      Math.ceil(totalClients / limit) +
      Math.ceil(totalayrolls / limit);

    const createdAtComparator = (a, b) => {
      return a.createdAt - b.createdAt;
    };

    let users: any = {};
    users.total = totalAdmins + totalClients + totalayrolls;
    users.pages = totalPages;
    users.data = [...admins, ...clients, ...payrolls];
    users.data.sort(createdAtComparator);


    return users;
  }
  
}
