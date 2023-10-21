import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../admin/entities/admin.entity';
import { AdminClient } from '../admin-client/entities/adminClient.entity';
import { Client } from '../clients/entities/client.entity';
import { Payroll } from '../payroll/entities/payroll.entity';
import { UserDocument, UserEntity } from '../users/entities/user.entity';

@Injectable()
export class GetAllUsersService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    @InjectModel(AdminClient.name) private readonly adminClientModel: Model<AdminClient>,
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(Payroll.name) private readonly payrollModel: Model<Payroll>,
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllUsers(): Promise<any[]> {
    const admins = await this.adminModel.find().exec();
    const adminClients = await this.adminClientModel.find().exec();
    const clients = await this.clientModel.find().exec();
    const payrolls = await this.payrollModel.find().exec();

    return [...admins, ...adminClients, ...clients, ...payrolls];
  }

  async getUsersByPage(page: number, limit: number): Promise<any[]> {

    let dataUsers = await this.userModel.aggregate([
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
          from: 'adminclients', 
          localField: '_id',
          foreignField: 'user',
          as: 'adminclients',
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
      {
        $skip: (page - 1) * limit, 
      },
      {
        $limit: limit,
      },
    ])
    .allowDiskUse(true);

    const totalUsers = await this.userModel.countDocuments().exec();
    const totalPages = Math.ceil(totalUsers / limit)

    const createdAtComparator = (a, b) => {
      return a.createdAt - b.createdAt;
    };

    let users: any = {};
    users.total = totalUsers;
    users.pages = totalPages;
    users.data = dataUsers;
    users.data.sort(createdAtComparator);

    return users;
    
  }


  async getUsersByPageFilterDocumentName(page: number, limit: number, document: number, name: string): Promise<any[]> {

    const query = { 
      ["documentNumber"]: document,
      ["name"]: name
    };

    let dataUsers = await this.userModel.aggregate([
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
          from: 'adminclients', 
          localField: '_id',
          foreignField: 'user',
          as: 'adminclients',
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
      {
        $match: query,
      },
      {
        $skip: (page - 1) * limit, 
      },
      {
        $limit: limit,
      },
    ])
    .allowDiskUse(true);

    const totalUsers = await this.userModel.countDocuments().exec();
    const totalPages = Math.ceil(totalUsers / limit)

    const createdAtComparator = (a, b) => {
      return a.createdAt - b.createdAt;
    };

    let users: any = {};
    users.total = totalUsers;
    users.pages = totalPages;
    users.data = dataUsers;
    users.data.sort(createdAtComparator);

    return users;
  }
  
}
