/* eslint-disable prettier/prettier */
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model, Types} from 'mongoose';
import {Novelty} from '../entities/novelty.entity';
import {CreateNoveltyDto} from '../dto/create-novelty.dto';
import {UpdateNoveltyDto} from '../dto/update-novelty.dto';
import axios, {AxiosResponse} from "axios";
import {Counter} from "../entities/counter.entity";
import {Concept} from "../../concepts/entities/concepts.entity";
import { Roles } from 'src/modules/roles/entities/roles.entity';
import { NoveltyMasterTemporappDto } from '../dto/novelty-master-temporapp.dto';
import { NoveltyRetirement } from 'src/modules/novelty-retirement/entities/novelty-retirement.entity';

@Injectable()
export class NoveltyService {
    constructor(
        @InjectModel(Novelty.name)
        private readonly noveltyModel: Model<Novelty>,
        @InjectModel(NoveltyRetirement.name) private noveltyRetirementModel: Model<NoveltyRetirement>,
        @InjectModel(Counter.name) private counterModel: Model<Counter>,
        @InjectModel(Concept.name) private conceptModel: Model<Concept>,
        @InjectModel(Roles.name) private readonly rolesModel: Model<Roles>,
    ) {
    }

    async create(novelty: CreateNoveltyDto): Promise<Novelty> {
        const counter = await this.counterModel.findOneAndUpdate(
            {model: 'Novelty', field: 'uid'},
            {$inc: {count: 1}},
            {upsert: true, new: true},
        );

        const createdNovelty = new this.noveltyModel({
            uid: counter.count,
            ...novelty,
        });

        return await createdNovelty.save();
    }

    async update(id: string, updateNoveltyDto: UpdateNoveltyDto): Promise<UpdateNoveltyDto> {
        const noveltyToUpdate = await this.noveltyModel.findById(id);
        if (!noveltyToUpdate) {
            throw new NotFoundException('Novedad no encontrada');
        }
        if (updateNoveltyDto.comments && updateNoveltyDto.comments.length > 0) {
            noveltyToUpdate.comments.push(...updateNoveltyDto.comments);
        }
        updateNoveltyDto.comments = noveltyToUpdate.comments;
        const updateNovelty = await this.noveltyModel.findByIdAndUpdate(
            id,
            updateNoveltyDto,
            {
                new: true,
                useFindAndModify: false
            },
        );

        return updateNovelty.toObject();
    }

    async findAllNovelties(
        page: number,
        limit: number
    ): Promise<any> {
        
       
        const validPage = Number(page) > 0 ? Number(page) : 1;
        const validLimit = Number(limit) > 0 ? Number(limit) : 10;

        const query = { state: { $in: [0, 1] } };
      
        const totalNovelties = await this.noveltyModel.countDocuments();
        const totalNoveltyTers = await this.noveltyRetirementModel.countDocuments();
        const totalRecords = totalNovelties + totalNoveltyTers;
      
        const totalPages = Math.ceil(totalRecords / validLimit);

        console.log(totalPages+"totalPages");
      
        const halfLimit = Math.ceil(validLimit / 2);
      
        let limitForNovelties = halfLimit;
        let limitForNoveltyTers = validLimit - halfLimit;

        const novelties = await this.noveltyModel.find(query)
          .limit(limitForNovelties)
          .populate('collaborator')
          .populate({
                path: 'concept',
                populate: {
                    path: 'categoryNovelty',
                },
          })
          .skip((validPage - 1) * limitForNovelties);
      
        const noveltyTers = await this.noveltyRetirementModel.find(query)
          .limit(limitForNoveltyTers)
          .populate('collaborator')
          .populate({
            path: 'conceptsRetirement',
            populate: {
                path: 'categoriesRetirement',
            },
          })
          .skip((validPage - 1) * limitForNoveltyTers);
      
        const combinedData = [...novelties, ...noveltyTers];
      
        const noveltiesResponse = {
          total: totalRecords,
          pages: totalPages,
          data: combinedData,
        };
      
        return noveltiesResponse;
    }

    async findOne(id: string): Promise<Novelty> {
        return await this.noveltyModel.findById(id)
            .populate('collaborator')
            .populate({
                path: 'concept',
                populate: {
                    path: 'categoryNovelty',
                },
            })
            .exec();
    }

    async findBy(
        page: number,
        limit: number,
        by: string,
        value: string | number,
        requestBodyFilters: Record<string, any> = {},
        roleKey: string
    ): Promise<Novelty[]> {
        let query = {};
        let queryBody = {};
        let conceptList= []

        console.log(requestBodyFilters);


        if (by !== 'find' && value !== 'all') {
            if (typeof value === 'string' && !isNaN(Number(value))) {
                query = {[by]: Number(value)};
            } else if (typeof value === 'string') {
                if (Types.ObjectId.isValid(value)) {
                    query = {[by]: value};
                } else {
                    query = {[by]: {$regex: new RegExp(value, 'i')}};
                }
            } else if (typeof value === 'number') {
                query = {[by]: value};
            }
        }
        if (by === 'category') {
            conceptList = await this.conceptModel.find({categoryNovelty: value}).select('_id').exec();
        }

        //filtrar 
        if (Object.keys(requestBodyFilters).length > 0) {
            Object.entries(requestBodyFilters).forEach(([key, val]) => {
                if (typeof val === 'string' && !isNaN(Number(val))) {
                    queryBody[key] = Number(val);
                } else if (typeof val === 'string') {
                    if (mongoose.Types.ObjectId.isValid(val)) {
                        queryBody[key] = val;
                    } else {
                        queryBody[key] = {$regex: new RegExp(val, 'i')};
                    }
                } else if (typeof val === 'number') {
                    queryBody[key] = val;
                }
            });
        }

        const combinedQuery = {...query, ...queryBody};
        
        const total = by === 'find' && value === 'all'
            ? await this.noveltyModel.countDocuments(combinedQuery).exec()
            : await this.noveltyModel.countDocuments(combinedQuery).exec();
        const totalPages = Math.ceil(total / limit);

        let search;

        

        let roleKeys = await this.rolesModel.find({ ["supervisor_role"]: roleKey }).exec();
        const queryConcept = {}
         if (roleKeys.length !== 0) {
            queryConcept['approves'] = { '$in': roleKeys.map(role => role.role_key) };
        } else if (roleKey !== "client") {
            queryConcept["approves"] = roleKey;
        }

        let concepts = await this.conceptModel.find(queryConcept).exec();
        const queryNovelty = by === 'category' ? { concept: { $in: conceptList } } : combinedQuery;
        queryNovelty['concept'] = { '$in': concepts.map(concept => concept._id) };


        if (by === 'documents'){
            queryNovelty['documents'] = { $size: 0 };
        }
       

        search = await this.noveltyModel
            .find(queryNovelty)
            .skip((page - 1) * limit)
            .populate('collaborator')
            .populate({
                path: 'concept',
                populate: {
                    path: 'categoryNovelty',
                },
            })
            .limit(limit)
            .exec();

            
// estadoo
// documentos en vacio 

        let data = search;

        // if (roleKeys.length != 0){
        //     data = search.filter(novelty => {
        //         return roleKeys.some(role => role.role_key === novelty.concept?.approves);
        //     });
        // }else{
        //     if (roleKey != "client") {
        //         data = search.filter(novelty => novelty.concept?.approves === roleKey);
        //     }
        // }

        const novelties: any = {};
        //novelties.total = data.length;
        novelties.pages = totalPages;
        novelties.roleKey = roleKey;
        novelties.data = data;

        return novelties;
    }

    async remove(id: string): Promise<void> {
        const deletedNovelty = await this.noveltyModel.findByIdAndDelete(id);

        if (!deletedNovelty) {
            throw new NotFoundException('Novedad no encontrada');
        }
    }

    // Integrations
    async getNoveltyByDocument(identification: string, initialDate: string, finalDate: string, type: string, token: string): Promise<AxiosResponse<any>> {
        const url = 'http://34.214.124.124:9896/ws/novedades/consultar';
        const data = {documento: identification, fechaDesde: initialDate, fechaHasta: finalDate, tipoInforme: type};
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(url, data, config);
        return response.data.mensaje;
    }

    async createNovelty(
        identifier: string,
        documentType: string,
        document: string,
        hiringId: string,
        businessName: string,
        nit: string,
        clientCode: string,
        date: string,
        advanceValue: string,
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = 'http://34.214.124.124:9896/ws/novedades/consultar';
        const data = {
            identificador: identifier,
            tipoDocumento: documentType,
            documento: document,
            hiringId: hiringId,
            razonSocial: businessName,
            nit: nit,
            codigoCliente: clientCode,
            fecha: date,
            tipoAdelanto: advanceValue,
        };
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(url, data, config);
        return response.data.mensaje;
    }


    async createNoveltyMaster(novelty: NoveltyMasterTemporappDto,
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = 'http://34.214.124.124:9896/ws/novedades/maestro';
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(url, novelty, config);
        return response.data.mensaje;
    }
}
