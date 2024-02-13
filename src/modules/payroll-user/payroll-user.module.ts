import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payroll, PayrollSchema } from './entities/payroll-user.entity';
import { PayrollUserController } from './controllers/payroll-user.controller';
import { PayrollUserService } from './services/payroll-user.service';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payroll.name, schema: PayrollSchema },
    ]),
  ],
  controllers: [PayrollUserController],
  providers: [PayrollUserService],
})
export class PayrollUserModule {}
