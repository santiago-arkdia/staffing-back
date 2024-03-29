/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from './auth.controller';
import {jwtConstants} from './constants';
import {RolessModule} from "../roles/roles.module";
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from '../admin/entities/admin.entity';
import { UsersExternalsModule } from '../users-externals/users-externals.module';
import { Collaborator, CollaboratorSchema } from '../collaborators/entities/collaborators.entity';
import { Client, ClientSchema } from '../clients/entities/client.entity';
import { Payroll, PayrollSchema } from '../payroll-user/entities/payroll-user.entity';

// import { AdminGuard } from './admin.guard';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
        MongooseModule.forFeature([{ name: Collaborator.name, schema: CollaboratorSchema }]),
        MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
        MongooseModule.forFeature([{ name: Payroll.name, schema: PayrollSchema }]),
        UsersModule,
        UsersExternalsModule,
        RolessModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '72h'},
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService, MongooseModule],
})
export class AuthModule {
}
