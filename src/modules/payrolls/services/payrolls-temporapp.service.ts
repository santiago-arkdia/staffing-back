/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payrolls } from '../entities/payrolls.entity';
// import { Novelty } from 'src/modules/novelty/entities/novelty.entity';
import { UploadsService } from 'src/modules/uploads/services/uploads.service';
import { NoveltyTemporAppService } from 'src/modules/novelty/services/novelty-temporapp.service';
import { Novelty } from 'src/modules/novelty/entities/novelty.entity';


@Injectable()
export class PayrollsTemporAppService {
  constructor(
    @InjectModel(Payrolls.name) private readonly payrollModel: Model<Payrolls>,
    @InjectModel(Novelty.name) private readonly noveltyModel: Model<Novelty>,
    // private noveltyTemporAppService:NoveltyTemporAppService,
    @Inject(NoveltyTemporAppService) private readonly noveltyTemporAppService: NoveltyTemporAppService, // Inyecta el servicio
    private uploadsService: UploadsService
  ) {}

  async noveltyPayroll(id){
    const noveltyToUpdate = await this.payrollModel.findById(id).populate('novelties').exec();
    const noveltySuccessfull = [];
    const noveltyReject = [];
    for (const novelty of noveltyToUpdate.novelties) {
      // Aquí puedes realizar cualquier operación con cada elemento de noveltyToUpdate.novelties
      const result = await this.noveltyTemporAppService.createNovelty(novelty._id);
      const objectNovelty = {
        payloadTemporApp:JSON.stringify(result.data),
        responseTemporApp: JSON.stringify(result.response),
        statusTemporApp: true,
        moduleApprove: novelty.moduleApprove,
      };
      if(result['response']['mensaje'][0][0]['respuesta'] == 0 ){
        //ACTUALIZAR NOVEDADES RECHAZADAS POR TEMPORAPP
        objectNovelty.moduleApprove = 'out_of_time';
        objectNovelty.statusTemporApp = false;
        noveltyReject.push(novelty);
      }else{
        noveltySuccessfull.push(novelty._id);
      }
      await this.noveltyModel.findByIdAndUpdate(novelty._id, objectNovelty);
      console.log(result['response']['mensaje'][0][0]['respuesta']);
    }
    if(noveltySuccessfull.length > 0){
      //ACTUALIZAR NOMINA CON NOVEDADES APROBADAS POR TEMPORAPP
      await this.payrollModel.findByIdAndUpdate(
        id,
        {
          novelties:noveltySuccessfull
        },
        {
          new: true,
          useFindAndModify: false,
        },
      );
    }

    return {noveltySuccessfull,noveltyReject};
  }
}
