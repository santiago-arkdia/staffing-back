import { Module } from '@nestjs/common';
import { UploadsService } from './services/uploads.service';
import { UploadsController } from './controllers/uploads.controller';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService]
})
export class UploadsModule {}
