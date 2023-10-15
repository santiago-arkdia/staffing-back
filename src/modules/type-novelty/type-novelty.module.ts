import { Module } from '@nestjs/common';
import { TypeNoveltyController } from './controllers/type-novelty.controller';
import { TypeNoveltyService } from './services/type-novelty.service';
import { TypeNovelty, TypeNoveltySchema } from './entities/type-novelty.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TypeNovelty.name, schema: TypeNoveltySchema },
    ]),
  ],
  controllers: [TypeNoveltyController],
  providers: [TypeNoveltyService],
})
export class TypeNoveltyModule {}
