/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {StateNoveltyService} from './services/state-novelty.service';
import {StateNoveltyController} from './controllers/state-novelty.controller';
import {
    NoveltyState,
    NoveltyStateSchema,
} from './entities/novelty-state.entity';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: NoveltyState.name, schema: NoveltyStateSchema},
        ]),
    ],
    controllers: [StateNoveltyController],
    providers: [StateNoveltyService],
})
export class StateNoveltyModule {
}
