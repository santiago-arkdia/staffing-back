import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategoriesNews,
  CategoriesNewsSchema,
} from './entities/categories-news.entity';
import { CategoriesNewsController } from './controllers/categories-news.controller';
import { CategoriesNewsService } from './services/categories-news.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoriesNews.name, schema: CategoriesNewsSchema },
    ]),
  ],
  controllers: [CategoriesNewsController],
  providers: [CategoriesNewsService],
})
export class CategoriesNewsModule {}
