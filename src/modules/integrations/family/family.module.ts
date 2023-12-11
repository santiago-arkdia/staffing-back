/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {FamilyController} from "./controllers/family.controller";
import {FamilyService} from "./services/family.service";

@Module({
    imports: [],
    controllers: [FamilyController],
    providers: [FamilyService]
})
export class FamilyModule {
}
