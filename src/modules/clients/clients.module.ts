/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './entities/client.entity';
import {AccountingInterface, AccountingInterfaceSchema} from '../accounting-interface/entities/accounting-interface.entity'
import { ClientController } from './controllers/client.controller';
import { ClientService } from './services/client.service';
// import { UsersService } from '../users/services/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    MongooseModule.forFeature([{ name: AccountingInterface.name, schema: AccountingInterfaceSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientsModule {}
