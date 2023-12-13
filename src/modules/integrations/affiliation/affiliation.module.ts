/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {AffiliationController} from "./controllers/affiliation.controller";
import {AffiliationService} from "./services/affiliation.service";

@Module({
    imports: [],
    controllers: [AffiliationController],
    providers: [AffiliationService],
})
export class AffiliationModule {}
