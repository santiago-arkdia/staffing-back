/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './user-services/user-services.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionController } from './connection.controller';
import { AllowAnyIPMiddleware } from './middleware/auth.middleware';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL, {
      autoIndex: true
    }),
    UsersModule,
    AuthModule,
    ServicesModule,
  ],
  controllers: [AppController, ConnectionController],
  providers: [AppService],
})
// export class AppModule {}
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AllowAnyIPMiddleware).forRoutes('*'); // Aplica la middleware a todas las rutas
  }
}