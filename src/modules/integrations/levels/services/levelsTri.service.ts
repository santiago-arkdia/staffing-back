/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import axios, {AxiosResponse} from "axios";

@Injectable()
export class LevelsTriService {
    constructor() {
    }

    async show(
        instance: number, //instancia_asignada
        startDate: string, //date_start
        endDate: string, //date_end
        type: number, //type
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = `https://api.t3rsc.co/api/level?instancia=${instance}&date_start=${startDate}&date_end=${endDate}&type=${type}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.get(url, config);
        return response.data;
    }

    async create(
        instance: number, //instancia
        description: string, //descripcion
        code: string, //codigo
        type: number, //tipo
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = 'https://api.t3rsc.co/api/level';
        const data = {
            instancia: instance,
            descripcion: description,
            codigo: code,
            tipo: type,
        };
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(url, data, config);
        return response.data;
    }

    async clientLevel(
        instance: number, //instancia
        codeLevel: string, //codigo_nivel
        typeLevel: number, //tipo_nivel
        nit: number, //nit
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = 'https://api.t3rsc.co/api/level/client';
        const data = {
            instancia: instance,
            codigo_nivel: codeLevel,
            tipo_nivel: typeLevel,
            nit: nit,
        };
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(url, data, config);
        return response.data;
    }
}
