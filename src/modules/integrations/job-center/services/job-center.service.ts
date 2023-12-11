/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import axios, {AxiosResponse} from "axios";

@Injectable()
export class JobCenterService {
    constructor() {}

    async create(
        instance: string, //instancia
        description: string, //descripcion
        homologateId: string, //homologa_id
        companyId: string, //empresa_id
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = 'https://api.t3rsc.co:8000/api/job-center';
        const data = {
            instancia: instance,
            descripcion: description,
            homologa_id: homologateId,
            empresa_id: companyId,
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
