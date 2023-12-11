/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import axios, {AxiosResponse} from "axios";

@Injectable()
export class FamilyService {
    constructor() {}

    async show(
        identification: string, //numero_id
        instance: string, //instancia_asignada
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = `https://api.t3rsc.co/api/family?instancia=${instance}&numero_id=${identification}`;
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
