import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collaborator } from '../entities/collaborators.entity';
import { Model } from 'mongoose';
import { CreateCollaboratorDto } from '../dto/create-collaborators.dto';
import { UpdateCollaboratorDto } from '../dto/update-collaborators.dto';

@Injectable()
export class CollaboratorService {
  constructor(@InjectModel(Collaborator.name) private readonly collaboratorModel: Model<Collaborator>) {}

  async create(collaborator: CreateCollaboratorDto): Promise<Collaborator> {
    const createdCollaborator = new this.collaboratorModel(collaborator);
    return await createdCollaborator.save();
  }

  async update(id: string, collaborator: UpdateCollaboratorDto): Promise<UpdateCollaboratorDto> {
    return await this.collaboratorModel.findByIdAndUpdate(id, collaborator, { new: true });
  }

  async findAll(): Promise<Collaborator[]> {
    return await this.collaboratorModel.find().exec();
  }

  async findOne(id: string): Promise<Collaborator> {
    return await this.collaboratorModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<Collaborator[]> {
    const query = { [by]: value };
    return await this.collaboratorModel.find(query).exec();
  }
}
