/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NoveltyService } from './services/novelty.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Novelty, NoveltySchema } from './entities/novelty.entity';
import { NoveltyController } from './controllers/novelty.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Novelty.name, schema: NoveltySchema }]),
  ],
  controllers: [NoveltyController],
  providers: [NoveltyService],
})
export class NoveltyModule {}
