/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {SpreadsheetNoveltyService} from './services/spreadsheet-novelty.service';
import {SpreadsheetNoveltyController} from './controllers/spreadsheet-novelty.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {
    NoveltySpreadsheet,
    NoveltySpreadsheetSchema,
} from './entities/spreadsheet-novelty.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: NoveltySpreadsheet.name, schema: NoveltySpreadsheetSchema},
        ]),
    ],
    providers: [SpreadsheetNoveltyService],
    controllers: [SpreadsheetNoveltyController],
})
export class SpreadsheetNoveltyModule {
}
