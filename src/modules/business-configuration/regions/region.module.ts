import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Region, RegionSchema } from './entities/region.entity';
import { RegionController } from './controllers/region.controller';
import { RegionService } from './services/region.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }]),
  ],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionsModule {}
