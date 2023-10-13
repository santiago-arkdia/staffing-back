import { Module } from '@nestjs/common';
import { AdminClient, AdminClientSchema } from './entities/adminClient.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from './controllers/adminClient.controller';
import { ClientService } from './services/adminClient.service' 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminClient.name, schema: AdminClientSchema },
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class AdminClientModule {}
