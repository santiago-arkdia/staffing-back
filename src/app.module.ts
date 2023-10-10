/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ServicesModule } from './modules/user-services/user-services.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionController } from './connection.controller';
import { AllowAnyIPMiddleware } from './middleware/auth.middleware';
import { AuthService } from './modules/auth/auth.service';
import { ClientsModule } from './modules/clients/clients.module';
import { AdminsModule } from './modules/admin/admin.module';
import { PayrollsModule } from './modules/payroll/payroll.module';
import { CountrysModule } from './modules/business-configuration/country/country.module';
import { RegionsModule } from './modules/business-configuration/regions/region.module';
import { CentersCostssModule } from './modules/business-configuration/centers-costs/centers-costs.module';
import { UtilityCentersModule } from './modules/business-configuration/utility-center/utility-center.module';
import { ModuleParameterizationsModule } from './modules/module-parameterization/module-parameterization.module';
import { RolessModule } from './modules/roles/roles.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL, {
      autoIndex: true
    }),
    UsersModule,
    AuthModule,
    ClientsModule,
    ServicesModule,
    AdminsModule,
    PayrollsModule,
    CountrysModule,
    RegionsModule,
    CentersCostssModule,
    UtilityCentersModule,
    ModuleParameterizationsModule,
    RolessModule
  ],
  controllers: [AppController, ConnectionController],
  providers: [AppService, AuthService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AllowAnyIPMiddleware).forRoutes('*'); // Aplica la middleware a todas las rutas
  }
}