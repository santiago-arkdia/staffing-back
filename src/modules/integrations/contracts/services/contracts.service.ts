/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import axios, {AxiosResponse} from "axios";

@Injectable()
export class ContractsService {
    constructor() {}

    async instanceList(
        instance: string, //instancia_asignada
        startDate: string, //date_start
        endDate: string, //date_end
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = `https://api.t3rsc.co/api/contracts?instancia=${instance}&date_start=${startDate}&date_end=${endDate}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.get(url, config);
        return response.data;
    }

    async contractInstance(
        document: string, //number_document
        instance: string, //instancia_asignada
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = `https://api.t3rsc.co/api/contracts/${document}?instancia=${instance}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.get(url, config);
        return response.data;
    }

}
