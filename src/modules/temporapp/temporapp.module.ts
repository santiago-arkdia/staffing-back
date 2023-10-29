import { Module } from '@nestjs/common';
import { TemporappController } from './controllers/temporapp.controller';
import { TemporappService } from './services/temporapp.service';

@Module({
  providers: [TemporappService],
  controllers: [TemporappController],
})
export class TemporappModule {}
