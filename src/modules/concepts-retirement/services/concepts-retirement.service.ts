import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConceptsRetirement } from '../entities/concepts-retirement.entity';
import { Model } from 'mongoose';
import { CreateConceptsRetirementDto } from '../dto/create-concepts-retirement.dto';
import { UpdateConceptsRetirementDto } from '../dto/update-concepts-retirement.dto';

@Injectable()
export class ConceptsRetirementService {
  constructor(@InjectModel(ConceptsRetirement.name) private readonly conceptsretirementModel: Model<ConceptsRetirement>) {}

  async create(conceptsretirement: CreateConceptsRetirementDto): Promise<ConceptsRetirement> {
    const createdConceptsRetirement = new this.conceptsretirementModel(conceptsretirement);
    return await createdConceptsRetirement.save();
  }

  async update(id: string, conceptsretirement: UpdateConceptsRetirementDto): Promise<UpdateConceptsRetirementDto> {
    return await this.conceptsretirementModel.findByIdAndUpdate(id, conceptsretirement, { new: true });
  }

  async findAll(): Promise<ConceptsRetirement[]> {
    return await this.conceptsretirementModel.find().exec();
  }

  async findOne(id: string): Promise<ConceptsRetirement> {
    return await this.conceptsretirementModel.findById(id).exec();
  }

  async findBy(by: string, value: string): Promise<ConceptsRetirement[]> {
    const query = { [by]: value };
    return await this.conceptsretirementModel.find(query).exec();
  }
}
