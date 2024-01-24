/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {OffersTriController} from "./controllers/offersTri.controller";
import {OffersTriService} from "./services/offersTri.service";

@Module({
    imports: [],
    controllers: [OffersTriController],
    providers: [OffersTriService]
})
export class OffersModule {
}
