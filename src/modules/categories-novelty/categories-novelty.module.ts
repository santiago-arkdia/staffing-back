import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategoriesNovelty,
  CategoriesNoveltySchema,
} from './entities/categories-novelties.entity';
import { CategoriesNewsController } from './controllers/categories-novelties.controller';
import { CategoriesNewsService } from './services/categories-novelties.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoriesNovelty.name, schema: CategoriesNoveltySchema },
    ]),
  ],
  controllers: [CategoriesNewsController],
  providers: [CategoriesNewsService],
})
export class CategoriesNoveltyModule {}
