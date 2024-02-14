/* eslint-disable prettier/prettier */
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Payrolls} from '../entities/payrolls.entity';
import {PayrollsDto} from '../dto/payrolls.dto';
import {FilterPayrollsDto} from '../dto/filter-payrolls.dto.';
import {CategoriesNovelty} from "../../categories-novelty/entities/categories-novelties.entity";
import { Novelty } from 'src/modules/novelty/entities/novelty.entity';
import { NoveltyRetirement } from 'src/modules/novelty-retirement/entities/novelty-retirement.entity';
import { NoveltySocialSecurity } from 'src/modules/novelty-social-security/entities/novelty-social-security.entity';
import { UpdatPayrollDto } from '../dto/update-payrolls.dto';

@Injectable()
export class PayrollsService {
    constructor(
        @InjectModel(Payrolls.name) private readonly payrollModel: Model<Payrolls>,
        @InjectModel(Novelty.name) private readonly noveltyModel: Model<Novelty>,
        @InjectModel(NoveltyRetirement.name) private readonly noveltyRetirementModel: Model<NoveltyRetirement>,
        @InjectModel(NoveltySocialSecurity.name) private readonly noveltySocialSecurityModel: Model<NoveltySocialSecurity>,
    ) {
    }

    async generatePayroll(year: string, month: string, payrollsDto: PayrollsDto): Promise<Payrolls> {
        const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 2, 0);


        const noveltiesIds = await this.noveltyModel.find({
            createdAt: { $gte: startDate, $lt: endDate },
            client: payrollsDto.client,
            outDate: 0
          }).select("_id").exec();

          console.log(noveltiesIds);

        const noveltiesRetirementIds = await this.noveltyRetirementModel.find({
            createdAt: { $gte: startDate, $lt: endDate },
            client: payrollsDto.client,
            outDate: 0
          }).select("_id").exec();

        console.log(noveltiesRetirementIds);  


        const noveltiesSocialSecurityIds = await this.noveltySocialSecurityModel.find({
            createdAt: { $gte: startDate, $lt: endDate },
            client: payrollsDto.client,
            outDate: 0
          }).select("_id").exec();

        console.log(noveltiesSocialSecurityIds);  

    
        const newPayroll = new this.payrollModel({
          novelties: noveltiesIds,
          noveltiesRetirement: noveltiesRetirementIds,
          noveltiesSocialSecurity: noveltiesSocialSecurityIds,
          client: payrollsDto.client,
          year: year,
          month: month
        });
    
        return newPayroll.save();
      }

      async update(id: string, updatPayrollDto: UpdatPayrollDto): Promise<UpdatPayrollDto> {
        const noveltyToUpdate = await this.noveltySocialSecurityModel.findById(id);
        if (!noveltyToUpdate) {
            throw new NotFoundException('Nomina no encontrada');
        }
        const updateNovelty = await this.noveltySocialSecurityModel.findByIdAndUpdate(
            id,
            updatPayrollDto,
            {
                new: true,
                useFindAndModify: false
            },
        );

        return updateNovelty.toObject();
    }

    async findBy( page: number, limit: number, requestBodyFilters: Record<string, any> = {} ): Promise<Payrolls[]> {

        const total = await this.payrollModel.countDocuments(requestBodyFilters).exec();
        const totalPages = Math.ceil(total / limit);

        let search = await this.payrollModel
                .find(requestBodyFilters)
                .skip((page - 1) * limit)
                .populate('novelties')
                .populate('noveltiesRetirement')
                .populate('noveltiesSocialSecurity')
                .populate('client')
                .limit(limit)
                .exec();

        let data = search;

        const novelties: any = {};
        novelties.total = data.length;
        novelties.pages = totalPages;
        novelties.data = data;

        return novelties;
    }


    async findById(id: string): Promise<Payrolls> {

      let payrolls = await this.payrollModel
          .findById(id)
          .populate('novelties')
          .populate('noveltiesRetirement')
          .populate('noveltiesSocialSecurity')
          .populate('client')
          .exec();

      return payrolls;

  }
}
