/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from './auth.controller';
import {jwtConstants} from './constants';
import {RolessModule} from "../roles/roles.module";

// import { AdminGuard } from './admin.guard';
@Module({
    imports: [
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
    exports: [AuthService],
})
export class AuthModule {
}
