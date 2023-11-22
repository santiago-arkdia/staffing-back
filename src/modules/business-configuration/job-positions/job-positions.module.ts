/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {JobPositions, JobPositionsSchema} from './entities/job-positions.entity';
import {JobPositionsController} from './controllers/job-positions.controller';
import {JobPositionsService} from './services/job-positions.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: JobPositions.name, schema: JobPositionsSchema},
        ]),
    ],
    controllers: [JobPositionsController],
    providers: [JobPositionsService],
})
export class JobPositionsModule {
}
