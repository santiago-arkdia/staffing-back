import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilityCenter, UtilityCenterSchema } from './entities/utility-center.entity';
import { UtilityCenterController } from './controllers/utility-center.controller';
import { UtilityCenterService } from './services/utility-center.service';
import { UsersService } from '../../users/services/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UtilityCenter.name, schema: UtilityCenterSchema },
    ]),
  ],
  controllers: [UtilityCenterController],
  providers: [UtilityCenterService],
})
export class UtilityCentersModule {}
