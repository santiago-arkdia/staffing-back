/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {ContractsController} from "./controllers/contracts.controller";
import {ContractsService} from "./services/contracts.service";

@Module({
    imports: [],
    controllers: [ContractsController],
    providers: [ContractsService]
})
export class ContractsModule {
}
