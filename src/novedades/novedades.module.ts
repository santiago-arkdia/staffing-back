import { Module } from '@nestjs/common';
import { NovedadesController } from './controllers/novedades.controller';
import { NovedadesService } from './services/novedades.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NovedadEntity, NovedadSchema } from './entities/novedad.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NovedadEntity.name, schema: NovedadSchema },
    ]),
  ],
  controllers: [NovedadesController],
  providers: [NovedadesService],
  exports: [NovedadesService],
})
export class NovedadesModule {}
