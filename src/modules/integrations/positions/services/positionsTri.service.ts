/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import axios, {AxiosResponse} from "axios";

@Injectable()
export class PositionsTriService {
    constructor() {
    }

    async show(
        instance: number, //instancia_asignada
        startDate: string, //date_start
        endDate: string, //date_end
        clientId: number, //cliente_id
        active: boolean, //active
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = `https://api.t3rsc.co/api/position?instancia=${instance}&cliente_id=${clientId}&active=${active}&date_start=${startDate}&date_end=${endDate}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.get(url, config);
        return response.data;
    }

    async showSpecific(
        instance: number, //instancia_asignada
        itemId: string, //item_id
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = `https://api.t3rsc.co/api/position/${itemId}?instancia=${instance}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.get(url, config);
        return response.data;
    }

    async store(
        instance: number, //instancia_asignada
        description: string, //descripcion
        code1: string, //codigo_1
        cltCode: number, //clt_codigo
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = 'https://api.t3rsc.co/api/position';
        const data = {
            instance: instance,
            description: description,
            code1: code1,
            cltCode: cltCode,
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
