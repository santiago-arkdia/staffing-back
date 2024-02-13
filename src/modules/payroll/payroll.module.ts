import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payroll, PayrollSchema } from './entities/payroll.entity';
import { PayrollController } from './controllers/payroll.controller';
import { PayrollService } from './services/payroll.service';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payroll.name, schema: PayrollSchema },
    ]),
  ],
  controllers: [PayrollController],
  providers: [PayrollService],
})
export class PayrollModule {}
