/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Payrolls } from '../entities/payrolls.entity';
import { PayrollsDto } from '../dto/payrolls.dto';
import { Novelty } from 'src/modules/novelty/entities/novelty.entity';
import { UpdatPayrollDto } from '../dto/update-payrolls.dto';
import * as XLSX from 'xlsx';
import { UploadsService } from 'src/modules/uploads/services/uploads.service';
import { Client } from 'src/modules/clients/entities/client.entity';


@Injectable()
export class PayrollsService {
  constructor(
    @InjectModel(Payrolls.name) private readonly payrollModel: Model<Payrolls>,
    @InjectModel(Novelty.name) private readonly noveltyModel: Model<Novelty>,
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    
    private uploadsService: UploadsService
  ) {}

  async updatePayroll(
    id: string,
    payrollsDto: PayrollsDto,
  ): Promise<Payrolls> {
    
    const novelties = await this.noveltyModel
      .find({ _id: { $in: payrollsDto.novelty } })
      .select('_id')
      .exec();

      const payrollModelFind = await this.payrollModel.findById(id).exec();
      novelties.forEach(element => {
          payrollModelFind.novelties.push(element._id);
      });
    const updatePayroll =  this.payrollModel.findByIdAndUpdate(id,
      {
        novelties: payrollModelFind.novelties,
      }, {
      new: true,
      useFindAndModify: false,
    });
    return updatePayroll;
  }

  async generatePayroll(
    
    payrollsDto: PayrollsDto,
  ): Promise<Payrolls> {
    
    const clientData = await this.clientModel
    .find({  _id: payrollsDto.client})
    .exec();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-${month}-${clientData[0].cutoffDate}T23:59:59.000Z`);
    // const endDate = new Date(
    //   startDate.getFullYear(),
    //   startDate.getMonth() + 2,
    //   0,
    // );

    const existPayroll = await this.payrollModel.find({
      year: year,
      month: month
    }).exec();
    console.log(existPayroll);
    if(existPayroll.length > 0) {
      throw new HttpException('Ya existe una nomina generada', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    

    const novelties = await this.noveltyModel
      .find({
        createdAt: { $gte: startDate, $lt: endDate },
        client: payrollsDto.client,
        state:1
        // outDate: 0,
      })
      .select('_id')
      .exec();

    const maxConsecutive = await this.payrollModel
      .findOne({
        client: payrollsDto.client,
      })
      .sort({ consecutive: -1 })
      .limit(1);

    let newConsecutive = 1;

    if (maxConsecutive && maxConsecutive.consecutive != null) {
      newConsecutive = maxConsecutive ? maxConsecutive.consecutive + 1 : 1;
    }

    const newPayroll = new this.payrollModel({
      novelties: novelties,
      client: payrollsDto.client,
      year: year,
      month: month,
      state: 2,
      consecutive: newConsecutive,
    });

    const payroll = await newPayroll.save()
    console.log(payroll["_id"]);
    payroll.pathPayroll = await this.downloadPayroll(payroll["_id"].toString());

    return payroll;
  }

  async downloadPayroll(
    payroll: string
  ): Promise<any> {
    
    let search = await this.payrollModel
      .find({
        _id: payroll,
        // createdAt: { $gte: startDate, $lt: endDate }
      })
      .populate('novelties')
      .populate({
        path: 'novelties',
        populate: {
            path: 'collaborator',
            populate: {
              path: 'utilityCenter',
            }
        },
        
      })
      .populate({
        path: 'novelties',
        populate: {
            path: 'collaborator',
            populate: {
              path: 'centersCosts',
            }
        },
        
      })
      .populate({
        path: 'novelties',
        populate: {
            path: 'collaborator',
            populate: {
              path: 'jobPosition',
            }
        },
      })
      .populate({
        path: 'novelties',
        populate: {
            path: 'concept',
            populate: {
              path: 'categoryNovelty',
            }
        },
      })
      // .populate({
      //   path: 'novelties',
      //   populate: {
      //       path: 'centersCosts',
      //   },
      // })
      .populate('client')
      .exec();

      const dataForXLSX = search.flatMap((item) =>
      item.novelties.map((novelty) => ({
        "Cliente": item.client?.name,
        "Nit": item.client.nit,
        "Nombre colaborador": novelty.collaborator?.name,
        "Documento": novelty.collaborator.document,
        "Cargo": novelty.collaborator.jobPosition?.name,
//        "Centro de costo": novelty.centersCosts?.name,
//        "Centro de utilidad": novelty.utilityCenter?.name,
        "Codigo Concepto": novelty.reportingObject?.concepto,
        "Concepto": novelty.concept?.name,
        "Categoria": novelty.concept?.categoryNovelty?.typeNovelty,
//        "Observaciones": novelty.observations,
        "Fecha Reporte": novelty["createdAt"],
      }))
    );

    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataForXLSX);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payrolls");
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // const simulatedFile = {
    //   originalname: 'Payrolls.xlsx',
    //   buffer: buffer,
    // };

    const datePrefix = new Date().toISOString().slice(0, 10); // Formato 'YYYY-MM-DD'
    const fileName = `${datePrefix}-payrolls.xlsx`;

    const simulatedFile: Express.Multer.File = {
      buffer: buffer,
      originalname: fileName,
      mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      size: buffer.length,
      fieldname: 'file', 
      encoding: '7bit', 
      destination: '',
      filename: '',
      path: '',
      stream: null,
    };

    try {
      const result = await this.uploadsService.uploadToFirebase(simulatedFile); 
      let data =  await this.payrollModel.findByIdAndUpdate(payroll, {pathPayroll: result}, { new: true });
      return result;

    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updatPayrollDto: UpdatPayrollDto,
  ): Promise<UpdatPayrollDto> {
    const noveltyToUpdate = await this.payrollModel.findById(id);
    if (!noveltyToUpdate) {
      throw new NotFoundException('Nomina no encontrada');
    }
    const updateNovelty = await this.payrollModel.findByIdAndUpdate(
      id,
      updatPayrollDto,
      {
        new: true,
        useFindAndModify: false,
      },
    );

    return updateNovelty.toObject();
  }

  async findBy(
    page: number,
    limit: number,
    requestBodyFilters: Record<string, any> = {},
  ): Promise<Payrolls[]> {
    const total = await this.payrollModel
      .countDocuments(requestBodyFilters)
      .exec();
    const totalPages = Math.ceil(total / limit);

    let search = await this.payrollModel
      .find(requestBodyFilters)
      .skip((page - 1) * limit)
      .populate('novelties')
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
      .populate('client')
      .exec();

    return payrolls;
  }

  async noveltyNotAdded(id: string): Promise<Novelty[]> {
    const payrolls = await this.payrollModel
      .findById(id)
      .exec();
    const startDate = new Date(`${payrolls.year}-${payrolls.month}-01T00:00:00.000Z`);
    const endDate = new Date( startDate.getFullYear(), startDate.getMonth() + 2, 0, );
    const novelties = await this.noveltyModel
      .find({ 
        _id: { $nin: payrolls.novelties } ,
        client: payrolls.client,
        state:1,
        moduleApprove:'payroll',
        createdAt: { $gte: startDate, $lt: endDate },
      })
      .exec();

    return novelties;
  }
}
