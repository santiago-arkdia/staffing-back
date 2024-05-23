/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {AccountingInterfaceService} from './services/accounting-interface.service';
import {MongooseModule} from '@nestjs/mongoose';
import {AccountingInterface, AccountingInterfaceSchema} from './entities/accounting-interface.entity';
import {AccountingInterfaceController} from './controllers/accounting-interface.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: AccountingInterface.name, schema: AccountingInterfaceSchema}])],
    controllers: [AccountingInterfaceController],
    providers: [AccountingInterfaceService],
})
export class AccountingInterfaceModule {
}
