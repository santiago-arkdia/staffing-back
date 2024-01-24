/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {LevelsTriController} from "./controllers/levelsTri.controller";
import {LevelsTriService} from "./services/levelsTri.service";

@Module({
    imports: [],
    controllers: [LevelsTriController],
    providers: [LevelsTriService]
})
export class LevelsModule {
}
