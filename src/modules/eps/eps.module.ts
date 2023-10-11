import { Module } from '@nestjs/common';
import { EpsService } from './services/eps.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Eps, EpsSchema } from './entities/eps.entity';
import { EpsController } from './controllers/eps.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Eps.name, schema: EpsSchema }])],
  controllers: [EpsController],
  providers: [EpsService],
})
export class EpsModule {}
