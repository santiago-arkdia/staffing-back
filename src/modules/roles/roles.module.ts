import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Roles, RolesSchema } from './entities/roles.entity';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Roles.name, schema: RolesSchema },
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolessModule {}
