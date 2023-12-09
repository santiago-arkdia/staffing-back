/* eslint-disable prettier/prettier */
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model, Types} from 'mongoose';
import {Novelty} from '../entities/novelty.entity';
import {CreateNoveltyDto} from '../dto/create-novelty.dto';
import {UpdateNoveltyDto} from '../dto/update-novelty.dto';
import axios, {AxiosResponse} from "axios";
import {Counter} from "../entities/counter.entity";

@Injectable()
export class NoveltyService {
    constructor(
        @InjectModel(Novelty.name)
        private readonly noveltyModel: Model<Novelty>,
        @InjectModel(Counter.name) private counterModel: Model<Counter>,
    ) {
    }

    async create(novelty: CreateNoveltyDto): Promise<Novelty> {
        const counter = await this.counterModel.findOneAndUpdate(
            { model: 'Novelty', field: 'uid' },
            { $inc: { count: 1 } },
            { upsert: true, new: true },
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

    async findOne(id: string): Promise<Novelty> {
        return await this.noveltyModel.findById(id).exec();
    }

    async findBy(
        page: number,
        limit: number,
        by: string,
        value: string | number,
        requestBodyFilters: Record<string, any> = {},
        roleKey: string
    ): Promise<Novelty[]> {
        console.log('Role Key:', roleKey);
        let query = {};
        let queryBody = {};

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

        if (Object.keys(requestBodyFilters).length > 0) {
            Object.entries(requestBodyFilters).forEach(([key, val]) => {
                if (typeof val === 'string' && !isNaN(Number(val))) {
                    queryBody[key] = Number(val);
                } else if (typeof val === 'string') {
                    if (mongoose.Types.ObjectId.isValid(val)) {
                        queryBody[key] = val;
                    } else {
                        queryBody[key] = { $regex: new RegExp(val, 'i') };
                    }
                } else if (typeof val === 'number') {
                    queryBody[key] = val;
                }
            });
        }

        const combinedQuery = { ...query, ...queryBody };
        const total = by === 'find' && value === 'all'
            ? await this.noveltyModel.countDocuments(combinedQuery).exec()
            : await this.noveltyModel.countDocuments(combinedQuery).exec();
        const totalPages = Math.ceil(total / limit);

        let search;

        if (by === 'find' && value === 'all') {
            search = await this.noveltyModel
                .find(combinedQuery)
                .skip((page - 1) * limit)
                .populate('collaborator')
                .populate({
                    path: 'concept',
                    populate: {
                        path: 'categoryNovelty',
                    }
                })
                .limit(limit)
                .exec();
        } else {
            search = await this.noveltyModel
                .find(combinedQuery)
                .skip((page - 1) * limit)
                .populate('collaborator')
                .populate({
                    path: 'concept',
                    populate: {
                        path: 'categoryNovelty',
                    }
                })
                .limit(limit)
                .exec();
        }
  
        let data = search;

        if(roleKey != "client"){
            data = search.filter(novelty => novelty.concept?.approves === roleKey);
        }

        const novelties: any = {};
        novelties.total = data.length;
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
}
