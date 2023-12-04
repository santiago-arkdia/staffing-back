/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {ArlService} from './services/arl.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Arl, ArlSchema} from './entities/arl.entity';
import {ArlController} from './controllers/arl.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Arl.name, schema: ArlSchema}])
    ],
    controllers: [ArlController],
    providers: [ArlService],
})
export class ArlModule {
}
