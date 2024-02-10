import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategoriesSocialSecurity,
  CategoriesSocialSecuritySchema,
} from './entities/categories-social-security.entity';
import { CategoriesSocialSecurityController } from './controllers/categories-social-security.controller';
import { CategoriesSocialSecurityService } from './services/categories-social-security.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoriesSocialSecurity.name, schema: CategoriesSocialSecuritySchema },
    ]),
  ],
  controllers: [CategoriesSocialSecurityController],
  providers: [CategoriesSocialSecurityService],
})
export class CategoriesSocialSecurityModule {}
