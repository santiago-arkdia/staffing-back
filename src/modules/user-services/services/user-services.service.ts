/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserServiceEntity,
  UserDocument,
} from '../entities/user-service.entity';
import { CreateServiceDto } from '../dto/create-service.dto';

export type Service = any;

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(UserServiceEntity.name)
    private readonly serviceModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<Service[]> {
    const services = await this.serviceModel.find().exec();
    return services;
  }

  async findByRole(role: string): Promise<Service[]> {
    const service = await this.serviceModel.find({ role }).exec();
    return service || null;
  }

  async createService(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = new this.serviceModel(createServiceDto);
    return newService.save();
  }

  async findById(id: string): Promise<Service> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(
        `El servicio con el ID ${id} no se encontró.`,
      );
    }
    return service;
  }

  async updateService(
    id: string,
    updateServiceDto: CreateServiceDto,
  ): Promise<Service> {
    const service = await this.findById(id);
    if (updateServiceDto.service !== undefined) {
      service.servece = updateServiceDto.service;
    }
    await service.save();
    return service;
  }

  async removeService(role: string): Promise<void> {
    await this.serviceModel.deleteMany({ role }).exec();
  }
}
