/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ContractsService } from './services/contracts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Contract, ContractSchema } from './entities/contracts.entity';
import { ContractsController } from './controllers/contracts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contract.name, schema: ContractSchema }]),
    
  ],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
