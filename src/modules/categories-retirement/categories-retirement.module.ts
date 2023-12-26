import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategoriesRetirement,
  CategoriesRetirementSchema,
} from './entities/categories-retirement.entity';
import { CategoriesRetirementController } from './controllers/categories-retirement.controller';
import { CategoriesRetirementService } from './services/categories-retirement.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoriesRetirement.name, schema: CategoriesRetirementSchema },
    ]),
  ],
  controllers: [CategoriesRetirementController],
  providers: [CategoriesRetirementService],
})
export class CategoriesRetirementModule {}
