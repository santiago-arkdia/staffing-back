/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import axios, {AxiosResponse} from "axios";

@Injectable()
export class AffiliationService {
    constructor() {}

    async show(
        document: string,
        instance: string, //instancia_asignada
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = `https://api.t3rsc.co/api/affiliation/${document}?instancia=${instance}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.get(url, config);
        console.log(response.data)
        return response.data.mensaje;
    }
}
