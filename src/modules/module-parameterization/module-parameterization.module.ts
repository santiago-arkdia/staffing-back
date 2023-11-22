/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ModuleParameterization, ModuleParameterizationSchema} from './entities/module-parameterization.entity';
import {ModuleParameterizationController} from './controllers/module-parameterization.controller';
import {ModuleParameterizationService} from './services/module-parameterization.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: ModuleParameterization.name, schema: ModuleParameterizationSchema},
        ]),
    ],
    controllers: [ModuleParameterizationController],
    providers: [ModuleParameterizationService],
})
export class ModuleParameterizationModule {
}
