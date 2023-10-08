import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CentersCosts, CentersCostsSchema } from './entities/centers-costs.entity';
import { CentersCostsController } from './controllers/centers-costs.controller';
import { CentersCostsService } from './services/centers-costs.service';
import { UsersService } from '../../users/services/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CentersCosts.name, schema: CentersCostsSchema },
    ]),
  ],
  controllers: [CentersCostsController],
  providers: [CentersCostsService],
})
export class CentersCostssModule {}
