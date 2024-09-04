/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { DatasourcesService } from './datasources.service';
import { DatasourcesController } from './datasources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemporalAccumulatedExtract } from './entities/temporal-accumulated-extract.entity';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { InjectDatasourceService } from './services/inject-datasource.service';
import { ClientsModule } from '../clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from '../clients/entities/client.entity';
import { AccountingInterfaceService } from './services/generate-accounting-interface.service';
import { AccountingInterface } from './entities/temporal-accounting-interface.entity';
import { TemporalSS } from './entities/temporal-ss.entity';
import { AwsS3Module } from '../aws/s3/aws-s3.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: 

  [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([TemporalAccumulatedExtract, AccountingInterface, TemporalSS]),
    MongooseModule.forFeature([{ name: Client.name,  schema: ClientSchema }]),

  MulterModule.register({
    storage: multer.memoryStorage(),
  }),
  
  
  ClientsModule, AwsS3Module],
  controllers: [DatasourcesController],
  providers: [DatasourcesService, InjectDatasourceService, AccountingInterfaceService, AwsS3Module],
  
})
export class DatasourcesModule {}
