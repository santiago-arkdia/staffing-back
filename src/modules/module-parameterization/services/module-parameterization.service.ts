import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModuleParameterization } from '../entities/module-parameterization.entity';
import { CreateModuleParameterizationsDto } from '../dto/create-module-parameterization.dto';

@Injectable()
export class ModuleParameterizationService {
  constructor(
    @InjectModel(ModuleParameterization.name)
    private readonly moduleParameterizationModel: Model<ModuleParameterization>,
  ) {}

  async create(
    moduleParameterization: CreateModuleParameterizationsDto,
  ): Promise<ModuleParameterization> {
    const createdModuleParameterization = new this.moduleParameterizationModel(
      moduleParameterization,
    );
    return await createdModuleParameterization.save();
  }

  async update(
    id: string,
    moduleParameterization: ModuleParameterization,
  ): Promise<ModuleParameterization> {
    return await this.moduleParameterizationModel.findByIdAndUpdate(
      id,
      moduleParameterization,
      { new: true },
    );
  }

  async findAll(): Promise<ModuleParameterization[]> {
    return await this.moduleParameterizationModel.find().exec();
  }

  async findOne(id: string): Promise<ModuleParameterization> {
    return await this.moduleParameterizationModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<ModuleParameterization[]> {
    const query = { [by]: value };
    return await this.moduleParameterizationModel.find(query).exec();
  }
}
