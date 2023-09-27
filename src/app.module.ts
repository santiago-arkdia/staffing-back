/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionController } from './connection.controller';
// import { CorsMiddleware } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL, {
      autoIndex: true
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, ConnectionController],
  providers: [AppService],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CorsMiddleware).forRoutes('*');
//   }
// }