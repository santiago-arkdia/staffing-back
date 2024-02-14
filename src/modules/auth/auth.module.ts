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
import { AdminsModule } from '../admin/admin.module';

// import { AdminGuard } from './admin.guard';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
        UsersModule,
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
