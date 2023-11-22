/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {CostCenters, CentersCostsSchema} from './entities/centers-costs.entity';
import {CentersCostsController} from './controllers/centers-costs.controller';
import {CentersCostsService} from './services/centers-costs.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: CostCenters.name, schema: CentersCostsSchema},
        ]),
    ],
    controllers: [CentersCostsController],
    providers: [CentersCostsService],
})
export class CostCentersModule {
}
