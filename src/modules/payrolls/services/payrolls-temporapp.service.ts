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
    // console.log(noveltyToUpdate.novelties);
    for (const novelty of noveltyToUpdate.novelties) {
      // console.log(novelty);
      // Aquí puedes realizar cualquier operación con cada elemento de noveltyToUpdate.novelties
      const result = await this.noveltyTemporAppService.createNovelty(novelty._id);
console.log(result);
      await this.noveltyModel.findByIdAndUpdate(novelty._id, { payloadTemporApp:JSON.stringify(result.data),responseTemporApp: JSON.stringify(result.response) });
    }
  }
}
