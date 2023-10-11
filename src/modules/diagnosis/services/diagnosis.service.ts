import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Diagnosis } from '../entities/diagnosis.entity';
import { Model } from 'mongoose';
import { CreateDiagnosisDto } from '../dto/create-diagnosis.dto';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectModel(Diagnosis.name)
    private readonly diagnosisModel: Model<Diagnosis>,
  ) {}

  async create(diagnosis: CreateDiagnosisDto): Promise<Diagnosis> {
    const createDiagnosis = new this.diagnosisModel(diagnosis);
    return await createDiagnosis.save();
  }

  async update(id: string, diagnosis: Diagnosis): Promise<Diagnosis> {
    return await this.diagnosisModel.findByIdAndUpdate(id, diagnosis);
  }

  async findAll(): Promise<Diagnosis[]> {
    return await this.diagnosisModel.find().exec();
  }

  async findOne(id: string): Promise<Diagnosis> {
    return await this.diagnosisModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<Diagnosis[]> {
    const query = { [by]: value };
    return await this.diagnosisModel.find(query).exec();
  }
}
