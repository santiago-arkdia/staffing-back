import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payrolls, PayrollsSchema } from './entities/payrolls.entity';
import { PayrollsController } from './controllers/payrolls.controller';
import { PayrollsService } from './services/payrolls.service';
import { UsersService } from '../users/services/users.service';
import { Novelty, NoveltySchema } from '../novelty/entities/novelty.entity';
import { NNoveltyRetirementSchema, NoveltyRetirement } from '../novelty-retirement/entities/novelty-retirement.entity';
import { NNoveltySocialSecuritySchema, NoveltySocialSecurity } from '../novelty-social-security/entities/novelty-social-security.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payrolls.name, schema: PayrollsSchema },
      { name: Novelty.name, schema: NoveltySchema },
      { name: NoveltyRetirement.name, schema: NNoveltyRetirementSchema },
      { name: NoveltySocialSecurity.name, schema: NNoveltySocialSecuritySchema }
    ]),
  ],
  controllers: [PayrollsController],
  providers: [PayrollsService],
})
export class PayrollsModule {}
