import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConceptsSocialSecurity } from '../entities/concepts-social-security.entity';
import { Model } from 'mongoose';
import { CreateConceptsSocialSecurityDto } from '../dto/create-concepts-social-security.dto';
import { UpdateConceptsSocialSecurityDto } from '../dto/update-concepts-social-security.dto';

@Injectable()
export class ConceptsSocialSecurityService {
  constructor(@InjectModel(ConceptsSocialSecurity.name) private readonly conceptsretirementModel: Model<ConceptsSocialSecurity>) {}

  async create(conceptsretirement: CreateConceptsSocialSecurityDto): Promise<ConceptsSocialSecurity> {
    const createdConceptsSocialSecurity = new this.conceptsretirementModel(conceptsretirement);
    return await createdConceptsSocialSecurity.save();
  }

  async update(id: string, conceptsretirement: UpdateConceptsSocialSecurityDto): Promise<UpdateConceptsSocialSecurityDto> {
    return await this.conceptsretirementModel.findByIdAndUpdate(id, conceptsretirement, { new: true });
  }

  async findAll(): Promise<ConceptsSocialSecurity[]> {
    return await this.conceptsretirementModel.find()
            .populate("categoriesRetirement")
            .exec();
  }

  async findOne(id: string): Promise<ConceptsSocialSecurity> {
    return await this.conceptsretirementModel.findById(id)
          .populate("categoriesRetirement")
          .exec();
  }

  async findBy(by: string, value: string): Promise<ConceptsSocialSecurity[]> {
    const query = { [by]: value };
    return await this.conceptsretirementModel.find(query)
        .populate("categoriesRetirement")
        .exec();
  }
}
