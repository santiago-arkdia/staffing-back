import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Concept } from './../entities/concepts.entity';
import { CreateConceptsDto } from '../dto/create-concepts.dto';

@Injectable()
export class ConceptsService {
  constructor(
    @InjectModel(Concept.name)
    private readonly conceptModel: Model<Concept>,
  ) {}

  async create(concept: CreateConceptsDto): Promise<Concept> {
    console.log(concept);
    const createdConcept = new this.conceptModel(concept);
    return await createdConcept.save();
  }

  async update(id: string, concept: Concept): Promise<Concept> {
    return await this.conceptModel.findByIdAndUpdate(id, concept);
  }

  async findAll(): Promise<Concept[]> {
    return await this.conceptModel.find().exec();
  }

  async findOne(id: string): Promise<Concept> {
    return await this.conceptModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<Concept[]> {
    const query = { [by]: value };
    return await this.conceptModel.find(query).exec();
  }
}
