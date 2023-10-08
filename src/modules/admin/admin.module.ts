import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/admin.entity';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminsModule {}
