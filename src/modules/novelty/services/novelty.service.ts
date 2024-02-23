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
import { Client } from 'src/modules/clients/entities/client.entity';
import { NoveltySocialSecurity } from 'src/modules/novelty-social-security/entities/novelty-social-security.entity';

@Injectable()
export class NoveltyService {
    constructor(
        @InjectModel(Novelty.name)
        private readonly noveltyModel: Model<Novelty>,
        @InjectModel(NoveltyRetirement.name) private noveltyRetirementModel: Model<NoveltyRetirement>,
        @InjectModel(NoveltySocialSecurity.name) private noveltySocialSecurity: Model<NoveltySocialSecurity>,
        @InjectModel(Counter.name) private counterModel: Model<Counter>,
        @InjectModel(Concept.name) private conceptModel: Model<Concept>,
        @InjectModel(Client.name) private readonly clientModel: Model<Client>,
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

    async findAllNovelties(page: number, limit: number, year: string, month: string, typeNovelty: string): Promise<any> {
        const validPage = Number(page) > 0 ? Number(page) : 1;
        const validLimit = Number(limit) > 0 ? Number(limit) : 10;
    
        const query = { typeNovelty: typeNovelty };
    
        if (year) {
            let startDate = new Date();
            let endDate = new Date();
    
            startDate.setFullYear(parseInt(year), month ? parseInt(month) - 1 : 0, 1);
            startDate.setHours(0, 0, 0, 0);
    
            endDate.setFullYear(parseInt(year), month ? parseInt(month) : 0, 1);
            if (month) {
                endDate.setMonth(endDate.getMonth() + 1); 
            } else {
                startDate.setMonth(0); 
                endDate.setMonth(0); 
                endDate.setFullYear(endDate.getFullYear() + 1);
            }
            endDate.setHours(0, 0, 0, -1);
    
            query['createdAt'] = {
                $gte: startDate,
                $lt: endDate
            };
        }  
    
        const totalNovelties = await this.noveltyModel.countDocuments(query);
        const totalNoveltyTers = await this.noveltyRetirementModel.countDocuments(query);
    
        const totalPagesNovelties = Math.ceil(totalNovelties / validLimit);
        const totalPagesNoveltyTers = Math.ceil(totalNoveltyTers / validLimit);
    
        let skipAmount = (validPage - 1) * validLimit;
    
        const novelties = await this.noveltyModel.find(query)
            .limit(validLimit)
            .populate('collaborator')
            .populate({
                path: 'concept',
                populate: {
                    path: 'categoryNovelty',
                },
            })
            .skip(skipAmount);
    
        const noveltyTers = await this.noveltyRetirementModel.find(query)
            .limit(validLimit)
            .populate('collaborator')
            .populate({
                path: 'conceptsRetirement',
                populate: {
                    path: 'categoriesRetirement',
                },
            })
            .skip(skipAmount);
    
        const combinedData = [...novelties, ...noveltyTers];
        const totalRecords = totalNovelties + totalNoveltyTers;
        const totalPages = Math.max(totalPagesNovelties, totalPagesNoveltyTers);
    
        const response = {
            total: totalRecords,
            pages: totalPages,
            data: combinedData,
        };
    
        return response;
    }

    async findAllNoveltiesFilter(page: number, limit: number, year: string, month: string, typeNovelty: string): Promise<any> {
        const validPage = Number(page) > 0 ? Number(page) : 1;
        const validLimit = Number(limit) > 0 ? Number(limit) : 10;
    
        const query = { typeNovelty: typeNovelty, state: { $in: [0, 1] } };
    
        if (year) {
            let startDate = new Date();
            let endDate = new Date();
    
            startDate.setFullYear(parseInt(year), month ? parseInt(month) - 1 : 0, 1);
            startDate.setHours(0, 0, 0, 0);
    
            endDate.setFullYear(parseInt(year), month ? parseInt(month) : 0, 1);
            if (month) {
                endDate.setMonth(endDate.getMonth() + 1); 
            } else {
                startDate.setMonth(0); 
                endDate.setMonth(0); 
                endDate.setFullYear(endDate.getFullYear() + 1);
            }
            endDate.setHours(0, 0, 0, -1);
    
            query['createdAt'] = {
                $gte: startDate,
                $lt: endDate
            };
        }
    
        const totalNovelties = await this.noveltyModel.countDocuments(query);
        const totalNoveltyTers = await this.noveltyRetirementModel.countDocuments(query);
    
        const totalPagesNovelties = Math.ceil(totalNovelties / validLimit);
        const totalPagesNoveltyTers = Math.ceil(totalNoveltyTers / validLimit);
    
        let skipAmount = (validPage - 1) * validLimit;
    
        const novelties = await this.noveltyModel.find(query)
            .limit(validLimit)
            .populate('collaborator')
            .populate({
                path: 'concept',
                populate: {
                    path: 'categoryNovelty',
                },
            })
            .skip(skipAmount);
    
        const noveltyTers = await this.noveltyRetirementModel.find(query)
            .limit(validLimit)
            .populate('collaborator')
            .populate({
                path: 'conceptsRetirement',
                populate: {
                    path: 'categoriesRetirement',
                },
            })
            .skip(skipAmount);
    
        const combinedData = [...novelties, ...noveltyTers];
        const totalRecords = totalNovelties + totalNoveltyTers;
        const totalPages = Math.max(totalPagesNovelties, totalPagesNoveltyTers);
    
        const response = {
            total: totalRecords,
            pages: totalPages,
            data: combinedData,
        };
    
        return response;
    }
    
    

    async findOne(id: string): Promise<Novelty> {
        return await this.noveltyModel.findById(id)
            .populate('contract')
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
        typeNovelty: string,
        request: Record<string, any>
    ): Promise<Novelty[]> {
        let query = {};
        let queryBody = {};
        let conceptList= []
        
        console.log(request['user']);

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

        const queryNovelty = {}

        if(typeNovelty != "all"){
            queryNovelty["typeNovelty"] = typeNovelty;
        }

        if (by === 'documents'){
            queryNovelty['documents'] = { $size: 0 };
        }

        if (by === 'state'){
            queryNovelty['state'] = value
        }
       
        if (request['user'].roleKey != "collaborator" ){
            if(request['user'].roleKey == "client" ){
                queryNovelty['client'] = request['user'].id;
            }else{
                let clients = await this.clientModel.find({analysts: { $in: request['user'].userAdmin }}).exec();
                queryNovelty['client'] = { '$in': clients.map(client => client._id) };
            }
        }else{
            queryNovelty['collaborator'] = request['user'].userAdmin;
        }

        // const combinedQuery = {...query, ...queryBody};
        // combinedQuery['client'] = { '$in': clients.map(client => client._id) };
        
        const total = by === 'find' && value === 'all'
            ? await this.noveltyModel.countDocuments(queryNovelty).exec()
            : await this.noveltyModel.countDocuments(queryNovelty).exec();
        const totalPages = Math.ceil(total / limit);

        let search;

        

        // let roleKeys = await this.rolesModel.find({ ["supervisor_role"]: roleKey }).exec();
        // const queryConcept = {}
        //  if (roleKeys.length !== 0) {
        //     queryConcept['approves'] = { '$in': roleKeys.map(role => role.role_key) };
        // } else if (roleKey !== "client") {
        //     queryConcept["approves"] = roleKey;
        // }

        // let concepts = await this.conceptModel.find(queryConcept).exec();
        // const queryNovelty = by === 'category' ? { concept: { $in: conceptList } } : combinedQuery;
        // queryNovelty['concept'] = { '$in': concepts.map(concept => concept._id) };

      

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
        novelties.roleKey = request['user'].roleKey;
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

    async findByClient(page: number, limit: number, typeNovelty: string, idClient): Promise<any> {
        const validPage = Number(page) > 0 ? Number(page) : 1;
        const validLimit = Number(limit) > 0 ? Number(limit) : 10;
    
        const query = { typeNovelty: typeNovelty, state: { $in: [0, 1] } };
        // if (year) {
        //     let startDate = new Date();
        //     let endDate = new Date();
    
        //     // Establecer el año y, si se proporciona, el mes (ajustando por el índice base 0 de los meses en JS)
        //     startDate.setFullYear(parseInt(year), month ? parseInt(month) - 1 : 0, 1);
        //     startDate.setHours(0, 0, 0, 0); // Comienzo del día
    
        //     endDate.setFullYear(parseInt(year), month ? parseInt(month) : 0, 1);
        //     if (month) {
        //         endDate.setMonth(endDate.getMonth() + 1); // Mover al próximo mes
        //     } else {
        //         // Si no se proporciona mes, ajustar para cubrir todo el año
        //         startDate.setMonth(0); // Comienzo del año
        //         endDate.setMonth(0); // Comienzo del siguiente año
        //         endDate.setFullYear(endDate.getFullYear() + 1);
        //     }
        //     endDate.setHours(0, 0, 0, -1); // Justo antes de que comience el próximo periodo
    
        //     query['createdAt'] = {
        //         $gte: startDate,
        //         $lt: endDate
        //     };
        // }

    
        const totalNovelties = await this.noveltyModel.countDocuments(query);
        const totalNoveltyReiterment = await this.noveltyRetirementModel.countDocuments(query);
        const totalNoveltySocialSecurity = await this.noveltySocialSecurity.countDocuments(query);
    
        const totalPagesNovelties = Math.ceil(totalNovelties / validLimit);
        const totalPagesNoveltyReiterment = Math.ceil(totalNoveltyReiterment / validLimit);
        const totalPagesNoveltySocialSecurity = Math.ceil(totalNoveltySocialSecurity / validLimit);
    
        let skipAmount = (validPage - 1) * validLimit;
    
        const novelties = await this.noveltyModel.find(query)
            .limit(validLimit)
            .populate('collaborator')
            .populate({
                path: 'concept',
                populate: {
                    path: 'categoryNovelty',
                },
            })
            .skip(skipAmount);
    
        const noveltyNoveltyReiterment = await this.noveltyRetirementModel.find(query)
            .limit(validLimit)
            .populate('collaborator')
            .populate({
                path: 'conceptsRetirement',
                populate: {
                    path: 'categoriesRetirement',
                },
            })
            .skip(skipAmount);

        const noveltySocialSecurity = await this.noveltySocialSecurity.find(query)
            .limit(validLimit)
            .populate('collaborator')
            .populate({
                path: 'conceptsRetirement',
                populate: {
                    path: 'categoriesRetirement',
                },
            })
            .skip(skipAmount);
    
        const combinedData = [...novelties, ...noveltyNoveltyReiterment];
        const totalRecords =  totalNovelties + totalNoveltyReiterment + totalNoveltySocialSecurity;
        const totalPages = totalPagesNovelties + totalPagesNoveltyReiterment + totalPagesNoveltySocialSecurity;
    
        const response = {
            total: totalRecords,
            pages: totalPages,
            data: combinedData,
        };
    
        return response;
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
