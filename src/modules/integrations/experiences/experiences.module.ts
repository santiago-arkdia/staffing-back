/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {ExperiencesController} from "./controllers/experiences.controller";
import {ExperiencesService} from "./services/experiences.service";

@Module({
    imports: [],
    controllers: [ExperiencesController],
    providers: [ExperiencesService]
})
export class ExperiencesModule {}
