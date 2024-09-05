// src/modules/aws-s3/aws-s3.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'S3',
      useFactory: (configService: ConfigService) => {
        return new AWS.S3({
          accessKeyId: configService.get<string>('ACCESS_KEY'),
          secretAccessKey: configService.get<string>('SECRET_KEY'),
          region: configService.get<string>('ZONE'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['S3'],
})
export class AwsS3Module {}
