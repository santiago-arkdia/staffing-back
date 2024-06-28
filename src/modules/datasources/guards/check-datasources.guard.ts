/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from 'src/modules/clients/entities/client.entity';

@Injectable()
export class CheckDataSourcesGuard implements CanActivate {


    constructor(
        @InjectModel(Client.name)
        private readonly clientModel: Model<Client>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {


        const request = context.switchToHttp().getRequest();
        const name = request.headers['name'];
        const nit = request.headers['nit'];

        if (!name || !nit) {
            throw new BadRequestException('Headers name and nit are required');
        }

        const client = await this.clientModel.findOne({ nit: nit, name: name }).exec();


        if (!client) {
          throw new NotFoundException('Client not found, please try again');
        }
        
        request.client = client;

        return true;
    }
}
