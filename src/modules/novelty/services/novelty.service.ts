/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Novelty } from '../entities/novelty.entity';
import { CreateNoveltyDto } from '../dto/create-novelty.dto';
import { UpdateNoveltyDto } from '../dto/update-novelty.dto';

@Injectable()
export class NoveltyService {
  constructor(
    @InjectModel(Novelty.name)
    private readonly noveltyModel: Model<Novelty>,
  ) {}

  async create(novelty: CreateNoveltyDto): Promise<Novelty> {
    const createdNovelty = new this.noveltyModel(novelty);
    return await createdNovelty.save();
  }

  async update(
    id: string,
    updateNoveltyDto: UpdateNoveltyDto,
  ): Promise<UpdateNoveltyDto> {
    // Verifica si updateNoveltyDto.initialDate es una cadena válida antes de intentar convertirla
    if (
      updateNoveltyDto.initialDate &&
      !isNaN(Date.parse(updateNoveltyDto.initialDate.toString()))
    ) {
      updateNoveltyDto.initialDate = new Date(updateNoveltyDto.initialDate);
    } else {
      delete updateNoveltyDto.initialDate; // Elimina la propiedad si no es válida
    }

    // Verifica si updateNoveltyDto.finalDate es una cadena válida antes de intentar convertirla
    if (
      updateNoveltyDto.finalDate &&
      !isNaN(Date.parse(updateNoveltyDto.finalDate.toString()))
    ) {
      updateNoveltyDto.finalDate = new Date(updateNoveltyDto.finalDate);
    } else {
      delete updateNoveltyDto.finalDate; // Elimina la propiedad si no es válida
    }

    // Realiza la actualización de la entidad Novelty
    const updatedNovelty = await this.noveltyModel.findByIdAndUpdate(
      id,
      updateNoveltyDto,
      {
        new: true, // Esto devuelve la novedad actualizada en lugar de la anterior
      },
    );

    if (!updatedNovelty) {
      // Maneja el caso en que no se encuentra la novedad
      throw new NotFoundException('Novedad no encontrada');
    }

    return updatedNovelty;
  }

  async findAll(): Promise<Novelty[]> {
    return await this.noveltyModel.find().exec();
  }

  async findOne(id: string): Promise<Novelty> {
    return await this.noveltyModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<Novelty[]> {
    const query = { [by]: value };
    return await this.noveltyModel.find(query).exec();
  }

  async remove(id: string): Promise<void> {
    const deletedNovelty = await this.noveltyModel.findByIdAndDelete(id);

    if (!deletedNovelty) {
      throw new NotFoundException('Novedad no encontrada');
    }
  }
}
