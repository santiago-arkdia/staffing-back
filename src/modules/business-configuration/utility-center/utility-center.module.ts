/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UtilityCenters, UtilityCenterSchema} from './entities/utility-center.entity';
import {UtilityCenterController} from './controllers/utility-center.controller';
import {UtilityCenterService} from './services/utility-center.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: UtilityCenters.name, schema: UtilityCenterSchema},
        ]),
    ],
    controllers: [UtilityCenterController],
    providers: [UtilityCenterService],
})
export class UtilityCentersModule {
}
