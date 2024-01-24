/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import axios, {AxiosResponse} from "axios";

@Injectable()
export class OffersTriService {
    constructor() {
    }

    async show(
        instance: number, //instancia_asignada
        startDate: string, //date_start
        endDate: string, //date_end
        chargeId: number, //cargo_id
        clientId: number, //cliente_id
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = `https://api.t3rsc.co/offers?instancia=${instance}&date_start=${startDate}&date_end=${endDate}&cargo_id=${chargeId}&cliente_id=${clientId}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.get(url, config);
        return response.data;
    }

    async applyOffer(
        instance: number, //instancia
        reqId: string, //req_id
        numberId: number, //number_id
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = 'https://api.t3rsc.co/api/offer-apply';
        const data = {
            instancia: instance,
            req_id: reqId,
            numero_id: numberId,
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
