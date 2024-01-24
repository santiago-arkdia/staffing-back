/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {PositionsTriService} from "./services/positionsTri.service";
import {PositionsTriController} from "./controllers/positionsTri.controller";

@Module({
    imports: [],
    controllers: [PositionsTriController],
    providers: [PositionsTriService]
})
export class PositionsModule {
}
