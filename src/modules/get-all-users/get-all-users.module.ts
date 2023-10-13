/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GetAllUsersController } from './get-all-users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from '../admin/entities/admin.entity';
import {
  AdminClient,
  AdminClientSchema,
} from '../admin-client/entities/adminClient.entity';
import { Client, ClientSchema } from '../clients/entities/client.entity';
import { Payroll, PayrollSchema } from '../payroll/entities/payroll.entity';
import { GetAllUsersService } from './get-all-users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: AdminClient.name, schema: AdminClientSchema },
      { name: Client.name, schema: ClientSchema },
      { name: Payroll.name, schema: PayrollSchema },
    ]),
  ],
  providers: [GetAllUsersService],
  controllers: [GetAllUsersController],
})
export class GetAllUsersModule {}
