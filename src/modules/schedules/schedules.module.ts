import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedules, SchedulesSchema } from './entities/schedules.entity';
import { SchedulesController } from './controllers/schedules.controller';
import { SchedulesService } from './services/schedules.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Schedules.name, schema: SchedulesSchema }]),
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulessModule {}
