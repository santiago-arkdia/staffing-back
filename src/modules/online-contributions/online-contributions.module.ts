import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OnlineContributionsController } from './controllers/online-contributions.controller';
import { OnlineContributionsService } from './services/online-contributions.service';
import {
  OnlineContributions,
  OnlineContributionsSchema,
} from './entities/online-contributions.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OnlineContributions.name, schema: OnlineContributionsSchema },
    ]),
  ],
  controllers: [OnlineContributionsController],
  providers: [OnlineContributionsService],
})
export class OnlineContributionsModule {}
