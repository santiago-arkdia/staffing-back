/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Novelty } from '../entities/novelty.entity';
import { CreateNoveltyDto } from '../dto/create-novelty.dto';
import { UpdateNoveltyDto } from '../dto/update-novelty.dto';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Counter } from "../entities/counter.entity";
import { Concept } from "../../concepts/entities/concepts.entity";
import { Roles } from 'src/modules/roles/entities/roles.entity';
import { NoveltyMasterTemporappDto } from '../dto/novelty-master-temporapp.dto';
import { NoveltyRetirement } from 'src/modules/novelty-retirement/entities/novelty-retirement.entity';
import { Client } from 'src/modules/clients/entities/client.entity';
import { NoveltySocialSecurity } from 'src/modules/novelty-social-security/entities/novelty-social-security.entity';
import { Payrolls } from 'src/modules/payrolls/entities/payrolls.entity';
import { APIFeatures } from 'src/utils/api.features';
import { NoveltyTemporAppService } from './novelty-temporapp.service';

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
        @InjectModel(Payrolls.name) private readonly payrollsModel: Model<Payrolls>,
        @Inject(NoveltyTemporAppService) private readonly noveltyTemporAppService: NoveltyTemporAppService, // Inyecta el servicio
    ) {
    }

    async create(novelty: CreateNoveltyDto): Promise<Novelty> {
      

        const counter = await this.counterModel.findOneAndUpdate(
            { model: 'Novelty', field: 'uid' },
            { $inc: { count: 1 } },
            { upsert: true, new: true },
        );
        const clientData = await this.clientModel
        .find({  _id: novelty.client})
        .exec();
        const conceptData = await this.conceptModel.findById(novelty.concept);
        novelty.approves = conceptData.approves;
        const firstModule = novelty.approves.find(role => role.position == 1);
        const clavesAExcluir = ['nextModule', 'previusModule','position'];
        const infoModule = Object.keys(firstModule)
            .filter(key => !clavesAExcluir.includes(key))
            .reduce((obj, key) => {
                obj[key] = firstModule[key];
                return obj;
            }, {});
        novelty.moduleApprove = Object.keys(infoModule)[0];
        const createdNovelty = new this.noveltyModel({
            uid: counter.count,
            ...novelty,
        });

        const noveltyCreated = await createdNovelty.save();
        // PASAR DIRECTO A TEMPORAPP
        if(JSON.stringify(novelty.approves).includes('APROBADO')){
            noveltyCreated.moduleApprove =  novelty.approves[0]['nextModule'];
            noveltyCreated.state = 1;
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const endDate = new Date(`${year}-${month}-${clientData[0].cutoffDate}`); 
            if (currentDate > endDate ) {
                noveltyCreated.moduleApprove = 'out_of_time';
                await this.sendNoveltyTemporApp(noveltyCreated._id);
            }
            await this.noveltyModel.findByIdAndUpdate(
                noveltyCreated._id,
                noveltyCreated,
                {
                    new: true,
                    useFindAndModify: false
                },
            );
        }
        

        return noveltyCreated;
    }

    async update(id: string, updateNoveltyDto: UpdateNoveltyDto): Promise<UpdateNoveltyDto> {
        const noveltyToUpdate = await this.noveltyModel.findById(id);
        const clientData = await this.clientModel
        .find({  _id: noveltyToUpdate.client})
        .exec();
        if (!noveltyToUpdate) {
            throw new NotFoundException('Novedad no encontrada');
        }
        if (updateNoveltyDto.comments && updateNoveltyDto.comments.length > 0) {
            noveltyToUpdate.comments.push(...updateNoveltyDto.comments);
        }
        updateNoveltyDto.comments = noveltyToUpdate.comments;
        if (!updateNoveltyDto.approves) {
            updateNoveltyDto.approves = noveltyToUpdate.approves;
        }
        if (updateNoveltyDto.role && updateNoveltyDto.role.length > 0 && updateNoveltyDto.stateRole && updateNoveltyDto.stateRole.length > 0) {
            const filteredData = noveltyToUpdate.approves
                .map((item, index) => ({ item, index })) // Asocia cada objeto con su índice
                .filter(({ item }) => updateNoveltyDto.role in item);
            console.log(filteredData[0].index);
            // noveltyToUpdate.approves.forEach((approve, index) => {
               if (filteredData.length) {
                    const index = filteredData[0].index;
                    updateNoveltyDto.approves[index][updateNoveltyDto.role] = updateNoveltyDto.stateRole;  
                    
                    if(updateNoveltyDto.approves[index]['nextModule'] == 'payroll'){
                        updateNoveltyDto.state = 1;
                    }
                    if(updateNoveltyDto.stateRole == 'REJECTED' ){
                        updateNoveltyDto.moduleApprove = updateNoveltyDto.approves[index]['previusModule'];
                    
                    }if(updateNoveltyDto.stateRole == 'CORRECTION' ){
                        noveltyToUpdate.approves.forEach((approve2, index2) => {
                            if (Object.keys(approve2).includes(updateNoveltyDto.approves[index]['nextModule'])) {
                                updateNoveltyDto.approves[index2][updateNoveltyDto.approves[index]['nextModule']] = 'CORRECTION';
                            }
                        });
                        updateNoveltyDto.moduleApprove = updateNoveltyDto.approves[index]['correction'];
                        console.log(updateNoveltyDto);
                        
                    }  if(updateNoveltyDto.stateRole == 'PENDING' ){
                        noveltyToUpdate.approves.forEach((approve2, index2) => {
                            if (Object.keys(approve2).includes(updateNoveltyDto.approves[index]['previusModule'])) {
                                updateNoveltyDto.approves[index2][updateNoveltyDto.approves[index]['previusModule']] = 'PENDING';
                            }
                        });
                        updateNoveltyDto.moduleApprove = updateNoveltyDto.approves[index]['previusModule'];
                        
                    }  if(updateNoveltyDto.stateRole == 'APPROVED' && updateNoveltyDto.approves[index]['tri'] ){

                    }else {
                        updateNoveltyDto.moduleApprove = updateNoveltyDto.approves[index]['nextModule'];
                        console.log("aca");
                    }
                }
            // });
        }
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const endDate = new Date(`${year}-${month}-${clientData[0].cutoffDate}`); // Fecha que deseas comparar
        let lastApprovation = false ;
        updateNoveltyDto.approves.forEach( item  => {
            Object.entries(item).forEach(([key, value]) => {
                if (value === "APPROVED" && parseInt(item.position) == updateNoveltyDto.approves.length ) {
                  lastApprovation = true;
                } 
          });
        });
        if (currentDate > endDate && lastApprovation ) {
            updateNoveltyDto.moduleApprove = 'out_of_time';
            // updateNoveltyDto.statusTemporApp = false;
            await this.sendNoveltyTemporApp(noveltyToUpdate._id);
        }
        
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
            const startDate = new Date();
            const endDate = new Date();

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
            .populate('client')
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

        console.log(request['user']);
        console.log("object");

        if (by !== 'find' && value !== 'all') {
            if (typeof value === 'string' && !isNaN(Number(value))) {
                query = { [by]: Number(value) };
            } else if (typeof value === 'string') {
                if (Types.ObjectId.isValid(value)) {
                    query = { [by]: value };
                } else {
                    query = { [by]: { $regex: new RegExp(value, 'i') } };
                }
            } else if (typeof value === 'number') {
                query = { [by]: value };
            }
        }
     

        console.log(requestBodyFilters);
        const queryNovelty = {}
        if (Object.keys(requestBodyFilters).length > 0) {
            Object.entries(requestBodyFilters).forEach(([key, val]) => {
                if (typeof val === 'string' && !isNaN(Number(val))) {
                    queryNovelty[key] = Number(val);
                } else if (typeof val === 'string') {
                    if (mongoose.Types.ObjectId.isValid(val)) {
                        queryNovelty[key] = val;
                    } else {
                        queryNovelty[key] = { $regex: new RegExp(val, 'i') };
                    }
                } else if (typeof val === 'number') {
                    queryNovelty[key] = val;
                }
            });
        }
        const flattenedObject  = flattenObject(requestBodyFilters);   
        Object.assign(queryNovelty, flattenedObject);

         console.log(request['user'].roleKey);   
        if (request['user'].roleKey != "admin_payroll") {

            // if (typeNovelty != "all") {
            //     queryNovelty["typeNovelty"] = typeNovelty;
            // }

            if (by === 'documents') {
                queryNovelty['documents'] = { $size: 0 };
            }

            if (by === 'concept') {
                queryNovelty['concept'] = value
            }

            if (by === 'state') {
                queryNovelty['state'] = value
            }

            if (by === 'moduleApprove') {
                queryNovelty['moduleApprove'] = value
            }

            if (request['user'].roleKey != "collaborator") {
                if (request['user'].roleKey == "client") {
                    queryNovelty['client'] = request['user'].userEntity;
                } else {
                    const clients = await this.clientModel.find({ analysts: { $in: request['user'].userEntity } }).exec();
                    queryNovelty['client'] = { '$in': clients.map(client => client._id) };
                }
            } else {
                queryNovelty['collaborator'] = request['user'].userEntity;
            }
        }

        if (by === 'categoryNovelty') {
            let concepts = await this.conceptModel.find({ categoryNovelty: value }).exec();
            queryNovelty['concept'] = { '$in': concepts.map(concept => concept._id) };
        }

    


        const total = by === 'find' && value === 'all'
            ? await this.noveltyModel.countDocuments(queryNovelty).exec()
            : await this.noveltyModel.countDocuments(queryNovelty).exec();
        const totalPages = Math.ceil(total / limit);
        console.log(queryNovelty);
        let search = await this.noveltyModel
            .find(queryNovelty)
            .skip((page - 1) * limit)
            .populate({
                path: 'contract',
                model: 'Contract'
            })
            .populate('collaborator')
            .populate({
                path: 'concept',
                populate: {
                    path: 'categoryNovelty',
                },
            })
            .limit(limit)
            .exec();


        const novelties: any = {};
        novelties.total = total;
        novelties.pages = totalPages;
        novelties.roleKey = request['user'].roleKey;
        novelties.data = search;

        return novelties;
    }

    async findByProfile(
        page: number,
        limit: number,
        requestBodyFilters: Record<string, any> = {},
        request: Record<string, any>
    ): Promise<Novelty[]> {
        let query = {};
        const by = requestBodyFilters.by??'';
        const value = requestBodyFilters.value??'';
        // const typeNovelty = requestBodyFilters.typeNovelty??'';

        console.log(request['user']);
        console.log("object");

        if (by !== 'find' && value !== 'all') {
            if (typeof value === 'string' && !isNaN(Number(value))) {
                query = { [by]: Number(value) };
            } else if (typeof value === 'string') {
                if (Types.ObjectId.isValid(value)) {
                    query = { [by]: value };
                } else {
                    query = { [by]: { $regex: new RegExp(value, 'i') } };
                }
            } else if (typeof value === 'number') {
                query = { [by]: value };
            }
        }
     

        
        const queryNovelty = {}
        if (Object.keys(requestBodyFilters).length > 0) {
            Object.entries(requestBodyFilters).forEach(([key, val]) => {
                if(key != 'page' && key != 'limit'){
                    if (typeof val === 'string' && !isNaN(Number(val))) {
                        queryNovelty[key] = Number(val);
                    } else if (typeof val === 'string') {
                        if (mongoose.Types.ObjectId.isValid(val)) {
                            queryNovelty[key] = val;
                        } else {
                            queryNovelty[key] = { $regex: new RegExp(val, 'i') };
                        }
                    } else if (typeof val === 'number') {
                        queryNovelty[key] = val;
                    }
                }
            });
        }
        const flattenedObject  = flattenObject(requestBodyFilters);   
        Object.assign(queryNovelty, flattenedObject);

         
        if (request['user'].roleKey != "admin_payroll") {

            // if (typeNovelty != "all") {
            //     queryNovelty["typeNovelty"] = typeNovelty;
            // }

            if (by === 'documents') {
                queryNovelty['documents'] = { $size: 0 };
            }

            if (by === 'concept') {
                queryNovelty['concept'] = value
            }

            if (by === 'state') {
                queryNovelty['state'] = value
            }

            if (by === 'moduleApprove') {
                queryNovelty['moduleApprove'] = value
            }

            if (request['user'].roleKey != "collaborator") {
                if (request['user'].roleKey == "client") {
                    queryNovelty['client'] = request['user'].userEntity;
                } else {
                    const clients = await this.clientModel.find({ analysts: { $in: request['user'].userEntity } }).exec();
                    console.log(request['user']);
                    queryNovelty['client'] = { '$in': clients.map(client => client._id) };
                }
            } else {
                queryNovelty['collaborator'] = request['user'].userEntity;
            }
        }

        if (by === 'categoryNovelty') {
            let concepts = await this.conceptModel.find({ categoryNovelty: value }).exec();
            queryNovelty['concept'] = { '$in': concepts.map(concept => concept._id) };
        }

    


        const total = by === 'find' && value === 'all'
            ? await this.noveltyModel.countDocuments(queryNovelty).exec()
            : await this.noveltyModel.countDocuments(queryNovelty).exec();
        const totalPages = Math.ceil(total / limit);
        // console.log(queryNovelty);
        let search = await this.noveltyModel
            .find(queryNovelty)
            .skip((page - 1) * limit)
            .populate({
                path: 'contract',
                model: 'Contract'
            })
            .populate('collaborator')
            .populate({
                path: 'concept',
                populate: {
                    path: 'categoryNovelty',
                },
            })
            .limit(limit)
            .exec();


        const novelties: any = {};
        novelties.total = total;
        novelties.pages = totalPages;
        novelties.roleKey = request['user'].roleKey;
        novelties.data = search;

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
        const data = { documento: identification, fechaDesde: initialDate, fechaHasta: finalDate, tipoInforme: type };
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
        const totalRecords = totalNovelties + totalNoveltyReiterment + totalNoveltySocialSecurity;
        const totalPages = totalPagesNovelties + totalPagesNoveltyReiterment + totalPagesNoveltySocialSecurity;

        const response = {
            total: totalRecords,
            pages: totalPages,
            data: combinedData,
        };

        return response;
    }


    async createNoveltyMaster(novelty: NoveltyMasterTemporappDto, token: string): Promise<any> {
        const data: Array<Record<string, string | Record<string, string | number>>> = []
        const payroll = await this.payrollsModel.findById(novelty.noveltyId).exec()

        if (!payroll?.novelties)
            return [];

        const novelties = await this.noveltyModel.find({
            _id: { $in: payroll.novelties },
            typeNovelty: 'novelty'
        }).populate(['collaborator', 'client', 'concept']).exec();

        for (const novelty of novelties) {
            if (['novelty'].includes(novelty.typeNovelty)) { //TODO: Novedad Nomina
                data.push({
                    "tipoOperacion": 'NovedadNomina',
                    "instancia": "staffing",
                    "usuarioExterno": novelty.client.idTri.toString(),
                    "datos": {
                        "canal": "NELV2",
                        "nitCliente": novelty.client.nit,
                        "idCliente": novelty.client.idTri,
                        "documento": novelty.collaborator.document,
                        "concepto": novelty.concept?.code ?? '',
                        "proporcional": "0",
                        "cantidad": "0.00",
                        "fechaInicial": "2024-03-06",
                        // "diagnostico": "A000",
                        "dimension": "0"
                    }
                })

                continue;
            }

            // if ([
            //         'Por motivación'
            //     ].includes(concept.name)) { //TODO: Auxilio Extra Legal
            //     data.push({
            //         "tipoOperacion": concept.name,
            //         "instancia": "staffing",
            //         "usuarioExterno": payroll.client.user.email,
            //         "datos": {
            //             "canal": "NELV2",
            //             "nitCliente": payroll.client.nit,
            //             "idCliente": payroll.client.idTri.toString(),
            //             "documento": payroll.document,
            //             "concepto": concept.code,
            //             "proporcional": "0",
            //             "cantidad": "",
            //             "fechaInicial": "",
            //         }
            //     })

            //     continue;
            // }

            // if ([''].includes(concept.name)) { //TODO: Libranza
            //     data.push({
            //         "tipoOperacion": concept.name,
            //         "instancia": "staffing",
            //         "usuarioExterno": payroll.client.user.email,
            //         "datos": {
            //             "canal": "NELV2",
            //             "nitCliente": payroll.client.nit,
            //             "idCliente": payroll.client.idTri.toString(),
            //             "documento": payroll.document,
            //             "concepto": concept.code,
            //             "proporcional": "0",
            //             "cantidad": "",
            //             "fechaInicial": "",
            //             "cuotas": "0",
            //             "observacion": ""
            //         }
            //     })

            //     continue;
            // }

            // if ([''].includes(concept.name)) { //TODO: SLN
            //     data.push({
            //         "tipoOperacion": concept.name,
            //         "instancia": "staffing",
            //         "usuarioExterno": payroll.client.user.email,
            //         "datos": {
            //             "canal": "NELV2",
            //             "nitCliente": payroll.client.nit,
            //             "idCliente": payroll.client.idTri.toString(),
            //             "documento": payroll.document,
            //             "concepto": concept.code,
            //             "proporcional": "0",
            //             "cantidad": "",
            //             "fechaInicial": "",
            //             "fechaAusenticmo": "",
            //             "observacion": ""
            //         }
            //     })

            //     continue;
            // }

            // if ([''].includes(concept.name)) { //TODO: LR
            //     data.push({
            //         "tipoOperacion": concept.name,
            //         "instancia": "staffing",
            //         "usuarioExterno": payroll.client.user.email,
            //         "datos": {
            //             "canal": "NELV2",
            //             "nitCliente": payroll.client.nit,
            //             "idCliente": payroll.client.idTri.toString(),
            //             "documento": payroll.document,
            //             "concepto": concept.code,
            //             "proporcional": "0",
            //             "cantidad": "",
            //             "fechaInicial": "",
            //             "fechaAusenticmo": "",
            //             "observacion": ""
            //         }
            //     })

            //     continue;
            // }

            // if ([''].includes(concept.name)) { //TODO: Vacaciones
            //     data.push({
            //         "tipoOperacion": concept.name,
            //         "instancia": "staffing",
            //         "usuarioExterno": payroll.client.user.email,
            //         "datos": {
            //             "canal": "NELV2",
            //             "nitCliente": payroll.client.nit,
            //             "idCliente": payroll.client.idTri.toString(),
            //             "documento": payroll.document,
            //             "concepto": concept.code,
            //             "cantidad": "",
            //             "fechaInicial": "",
            //             "fechaAusenticmo": "",
            //             "diasEnDinero": "0",
            //             "proporcional": "0",
            //             "dia31": "0",
            //             "observacion": ""
            //         }
            //     })

            //     continue;
            // }

            // if (['Incapacidades'].includes(concept.name)) { //TODO: incapasidadEG
            //     data.push({
            //         "tipoOperacion": concept.name,
            //         "instancia": "staffing",
            //         "usuarioExterno": payroll.client.user.email,
            //         "datos": {
            //             "canal": "NELV2",
            //             "nitCliente": payroll.client.nit,
            //             "idCliente": payroll.client.idTri.toString(),
            //             "documento": payroll.document,
            //             "concepto": concept.code,
            //             "cantidad": "",
            //             "fechaInicial": "",
            //             "fechaAusenticmo": "",
            //             "numinCapacidad": "",
            //             "prorroga": "0",
            //             "numprorroga": "",
            //             "tipoAtencion": "",
            //             "diagnostico": "",
            //             "valor2": "0.00",
            //             "observacion": ""
            //         }
            //     })

            //     continue;
            // }

            // if ([''].includes(concept.name)) { //TODO: incapasidadLMA
            //     data.push({
            //         "tipoOperacion": concept.name,
            //         "instancia": "staffing",
            //         "usuarioExterno": payroll.client.user.email,
            //         "datos": {
            //             "canal": "NELV2",
            //             "nitCliente": payroll.client.nit,
            //             "idCliente": payroll.client.idTri.toString(),
            //             "documento": payroll.document,
            //             "concepto": concept.code,
            //             "cantidad": "",
            //             "fechaInicial": "",
            //             "fechaAusenticmo": "",
            //             "numinCapacidad": "",
            //             "prorroga": "0",
            //             "numprorroga": "",
            //             "diagnostico": "",
            //             "valor2": "0.00",
            //             "observacion": ""
            //         }
            //     })

            //     continue;
            // }

            // if ([''].includes(concept.name)) { //TODO: incapasidadLPA
            //     data.push({
            //         "tipoOperacion": concept.name,
            //         "instancia": "staffing",
            //         "usuarioExterno": payroll.client.user.email,
            //         "datos": {
            //             "canal": "NELV2",
            //             "nitCliente": payroll.client.nit,
            //             "idCliente": payroll.client.idTri.toString(),
            //             "documento": payroll.document,
            //             "concepto": concept.code,
            //             "cantidad": "",
            //             "fechaInicial": "",
            //             "fechaAusenticmo": "",
            //             "numinCapacidad": "",
            //             "prorroga": "0",
            //             "numprorroga": "",
            //             "diagnostico": "",
            //             "valor2": "0.00",
            //             "observacion": ""
            //         }
            //     })

            //     continue;
            // }

            // if ([''].includes(concept.name)) { //TODO: incapasidadAT
            //     data.push({
            //         "tipoOperacion": concept.name,
            //         "instancia": "staffing",
            //         "usuarioExterno": payroll.client.user.email,
            //         "datos": {
            //             "canal": "NELV2",
            //             "nitCliente": payroll.client.nit,
            //             "idCliente": payroll.client.idTri.toString(),
            //             "documento": payroll.document,
            //             "concepto": concept.code,
            //             "cantidad": "",
            //             "fechaInicial": "",
            //             "fechaAusenticmo": "",
            //             "fechaSuceso": "",
            //             "numinCapacidad": "",
            //             "prorroga": "0",
            //             "numprorroga": "",
            //             "diagnostico": "",
            //             "valor2": "0.00",
            //             "observacion": ""
            //         }
            //     })

            //     continue;
            // }
        }

        const dataResponse = [];

        const url = 'http://54.245.197.90:9896/ws/novedades/maestro';
        for (const item of data) {
            try {
                const responseLogin = await axios.post('http://54.245.197.90:9896/ws/usuarios/login', {
                    "usuario": "usrStaffingWeb",
                    "clave": "L5M6ctb5I@jF"
                })
                const config: AxiosRequestConfig = {
                    headers: {
                        'Authorization': `Bearer ${responseLogin.data.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post(url, item, config);
                dataResponse.push(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }

        return dataResponse;
    }

    async findAll(query?: any): Promise<any> {
        const features = new APIFeatures(this.noveltyModel.find(), query)
            .filter()
            .sort()
            .pagination()
            .populate();
        const novelties = await features.mongooseQuery;
        return {
            data: novelties,
            pages: await this.getPages(query)
        }
    }

    async getPages(query?: any) {
        const countFeatures = new APIFeatures(this.noveltyModel.find(), query).filter();
        const count = await countFeatures.mongooseQuery.countDocuments();
        const limit = query.limit * 1 || 10;
        let pages = 1;
        if (count > 0) {
            pages = Math.ceil(count / limit);
        }
        return pages;
    }

    async sendNoveltyTemporApp(novelty:string){
        const result = await this.noveltyTemporAppService.createNovelty(novelty);
        const objectNovelty = {
          payloadTemporApp:JSON.stringify(result.data),
          responseTemporApp: JSON.stringify(result.response),
          statusTemporApp: true
        };
        if(result['response']['mensaje'][0][0]['respuesta'] == 0 ){
          //ACTUALIZAR NOVEDADES RECHAZADAS POR TEMPORAPP
          objectNovelty.statusTemporApp = false;
        }
        await this.noveltyModel.findByIdAndUpdate(novelty, objectNovelty)
        return await this.noveltyModel.findById(novelty).exec();
    }
}

function flattenObject(obj: Record<string, any>, parentKey = '', res: Record<string, any> = {}): Record<string, any> {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          flattenObject(obj[key], newKey, res);
        } else {
          res[newKey] = obj[key];
        }
      }
    }
    return res;
  }