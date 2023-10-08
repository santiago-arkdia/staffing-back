import { Injectable } from '@nestjs/common';
import { NovedadDto } from './../dto/novedad.dto';
import { InjectModel } from '@nestjs/mongoose';
import { NovedadEntity, UserDocument } from '../entities/novedad.entity';
import { Model } from 'mongoose';

@Injectable()
export class NovedadesService {
  private novedades: NovedadDto[] = [];

  constructor(
    @InjectModel(NovedadEntity.name)
    private readonly nobedadModel: Model<UserDocument>,
  ) {}

  async create(novedadDto: NovedadDto): Promise<NovedadDto> {
    console.log(novedadDto);
    const novedad = new this.nobedadModel(novedadDto);
    return novedad.save();
  }

  async findAll(): Promise<NovedadDto[]> {
    const novedades = await this.nobedadModel.find().exec();
    return novedades;
  }

  findOne(index: number): NovedadDto {
    if (index >= 0 && index < this.novedades.length) {
      return this.novedades[index];
    }
    return null; // Manejar el caso en que el índice no sea válido
  }

  update(index: number, novedadDto: NovedadDto): NovedadDto {
    if (index >= 0 && index < this.novedades.length) {
      this.novedades[index] = novedadDto;
      return novedadDto;
    }
    return null; // Manejar el caso en que el índice no sea válido
  }

  remove(index: number): boolean {
    if (index >= 0 && index < this.novedades.length) {
      this.novedades.splice(index, 1);
      return true;
    }
    return false; // Manejar el caso en que el índice no sea válido
  }
}
