/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {JobCenterController} from "./controllers/job-center.controller";
import {JobCenterService} from "./services/job-center.service";

@Module({
    imports: [],
    controllers: [JobCenterController],
    providers: [JobCenterService]
})
export class JobCenterModule {
}
