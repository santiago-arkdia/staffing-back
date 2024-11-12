import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payrolls, PayrollsSchema } from './entities/payrolls.entity';
import { PayrollsController } from './controllers/payrolls.controller';
import { PayrollsService } from './services/payrolls.service';
// import { UsersService } from '../users/services/users.service';
import { Novelty, NoveltySchema } from '../novelty/entities/novelty.entity';
import {
  NNoveltyRetirementSchema,
  NoveltyRetirement,
} from '../novelty-retirement/entities/novelty-retirement.entity';
import {
  NNoveltySocialSecuritySchema,
  NoveltySocialSecurity,
} from '../novelty-social-security/entities/novelty-social-security.entity';
import { UploadsService } from '../uploads/services/uploads.service';
import { PayrollsTemporAppService } from './services/payrolls-temporapp.service';
import { NoveltyModule } from '../novelty/novelty.module';
import { Client, ClientSchema } from '../clients/entities/client.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payrolls.name, schema: PayrollsSchema },
      { name: Novelty.name, schema: NoveltySchema },
      { name: Client.name, schema: ClientSchema },
      { name: NoveltyRetirement.name, schema: NNoveltyRetirementSchema },
      {
        name: NoveltySocialSecurity.name,
        schema: NNoveltySocialSecuritySchema,
      },
    ]),
    NoveltyModule,
  ],
  controllers: [PayrollsController],
  providers: [PayrollsService, UploadsService, PayrollsTemporAppService],
})
export class PayrollsModule {}
