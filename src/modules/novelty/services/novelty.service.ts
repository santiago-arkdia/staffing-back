/* eslint-disable prettier/prettier */
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Novelty} from '../entities/novelty.entity';
import {CreateNoveltyDto} from '../dto/create-novelty.dto';
import {UpdateNoveltyDto} from '../dto/update-novelty.dto';
import axios, {AxiosResponse} from "axios";

@Injectable()
export class NoveltyService {
    constructor(
        @InjectModel(Novelty.name)
        private readonly noveltyModel: Model<Novelty>,
    ) {
    }

    async create(novelty: CreateNoveltyDto): Promise<Novelty> {
        const createdNovelty = new this.noveltyModel(novelty);
        return await createdNovelty.save();
    }

    async update(id: string, updateNoveltyDto: UpdateNoveltyDto): Promise<UpdateNoveltyDto> {
        if (
            updateNoveltyDto.initialDate &&
            !isNaN(Date.parse(updateNoveltyDto.initialDate.toString()))
        ) {
            updateNoveltyDto.initialDate = new Date(updateNoveltyDto.initialDate);
        } else {
            delete updateNoveltyDto.initialDate;
        }

        if (
            updateNoveltyDto.finalDate &&
            !isNaN(Date.parse(updateNoveltyDto.finalDate.toString()))
        ) {
            updateNoveltyDto.finalDate = new Date(updateNoveltyDto.finalDate);
        } else {
            delete updateNoveltyDto.finalDate;
        }

        const updatedNovelty = await this.noveltyModel.findByIdAndUpdate(
            id,
            updateNoveltyDto,
            {
                new: true,
                useFindAndModify: false
            },
        );

        if (!updatedNovelty) {
            throw new NotFoundException('Novedad no encontrada');
        }
        return null;
    }

    async findOne(id: string): Promise<Novelty> {
        return await this.noveltyModel.findById(id).exec();
    }

    async findBy(
        page: number,
        limit: number,
        by: string,
        value: string | number,
    ): Promise<Novelty[]> {
        let query = {};

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

        const total = by === 'find' && value === 'all'
            ? await this.noveltyModel.countDocuments().exec()
            : await this.noveltyModel.countDocuments(query).exec();
        const totalPages = Math.ceil(total / limit);

        let search;

        if (by === 'find' && value === 'all') {
            search = this.noveltyModel
                .find()
                .skip((page - 1) * limit)
                .populate("collaborator")
                .limit(limit)
                .exec();
        } else {
            search = this.noveltyModel
                .find(query)
                .skip((page - 1) * limit)
                .populate("collaborator")
                .limit(limit)
                .exec();
        }

        const data = await search;

        const novelties: any = {};
        novelties.total = total;
        novelties.pages = totalPages;
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
