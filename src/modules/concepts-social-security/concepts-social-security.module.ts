/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { ConceptsSocialSecurity, ConceptsSocialSecuritySchema } from './entities/concepts-social-security.entity';
import { ConceptsSocialSecurityController } from './controllers/concepts-social-security.controller';
import { ConceptsSocialSecurityService } from './services/concepts-social-security.service';

@Module({
    imports: [MongooseModule.forFeature([{name: ConceptsSocialSecurity.name, schema: ConceptsSocialSecuritySchema}])],
    controllers: [ConceptsSocialSecurityController],
    providers: [ConceptsSocialSecurityService],
})
export class ConceptsSocialSecurityModule {
}
