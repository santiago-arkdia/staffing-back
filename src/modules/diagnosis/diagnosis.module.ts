import { Module } from '@nestjs/common';
import { DiagnosisService } from './services/diagnosis.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Diagnosis, DiagnosisSchema } from './entities/diagnosis.entity';
import { DiagnosisController } from './controllers/diagnosis.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Diagnosis.name, schema: DiagnosisSchema },
    ]),
  ],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
})
export class DiagnosisModule {}
