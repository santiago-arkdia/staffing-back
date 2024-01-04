import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HourlyMeshesController } from './controllers/hourly-meshes.controller';
import { HourlyMeshesService } from './services/hourly-meshes.service';
import { HourlyMeshes, HourlyMeshesSchema } from './entities/hourly-meshes.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HourlyMeshes.name, schema: HourlyMeshesSchema }]),
  ],
  controllers: [HourlyMeshesController],
  providers: [HourlyMeshesService],
  exports: [HourlyMeshesService],
})
export class HourlyMeshessModule {}
