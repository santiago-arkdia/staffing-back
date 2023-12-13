/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import axios, {AxiosResponse} from "axios";

@Injectable()
export class ClientsTriService {
    constructor() {}

    async show(
        document: string, //number_document
        instance: string, //instancia_asignada
        startDate: string, //date_start
        endDate: string, //date_end
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = `https://api.t3rsc.co/api/clients?instancia=${instance}&date_start=${startDate}&date_end=${endDate}`;
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
        instance: string, //instancia
        nit: string, //nit
        name: string, //nombre
        address: string, //direccion
        phoneNumber: string, //telefono
        contact: string, //contacto
        email: string, //email
        homologatedId: string, //id_homologado
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = 'https://api.t3rsc.co/api/clients';
        const data = {
            instancia: instance,
            nit: nit,
            nombre: name,
            direccion: address,
            telefono: phoneNumber,
            contacto: contact,
            email: email,
            id_homologado: homologatedId,
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

    async clientPayroll(
        instance: string, //instancia
        nit: string, //nit
        description: string, //descripcion
        payrollCode: string, //codigo_nomina
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = 'https://api.t3rsc.co/api/clients/payroll';
        const data = {
            instancia: instance,
            nit: nit,
            descripcion: description,
            codigo_nomina: payrollCode,
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
