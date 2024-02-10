/* eslint-disable prettier/prettier */
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, {AxiosResponse} from "axios";
import { Model } from 'mongoose';
import { CreateClientTriDto } from 'src/modules/clients/dto/create-client-tri.dto';
import { Client } from 'src/modules/clients/entities/client.entity';

@Injectable()
export class ClientsTriService {
    constructor(@InjectModel(Client.name) private clientsModel: Model<Client>) {}

    async show(
        instance: string,
        startDate: string,
        endDate: string,
        token: string
    ): Promise<AxiosResponse<any>> {
        
        const url = `http://qa.api.t3rsc.co/api/clients`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.get(`${url}?instancia=${instance}&date_start=${startDate}&date_end=${endDate}`, config);
            this.syncClients(response.data.clients)
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Error making the request:', error.response.data);
                throw new HttpException({
                    status: error.response.status,
                    error: error.response.data,
                }, HttpStatus.UNPROCESSABLE_ENTITY); 
            } else if (error.request) {
                console.error('The request was made but no response was received', error.request);
                throw new HttpException('No response from server', HttpStatus.SERVICE_UNAVAILABLE);
            } else {
                console.error('Error', error.message);
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async syncClients(clients: any[]): Promise<void> {
        for (const client of clients) {
          const existingClient = await this.clientsModel.findOne({ idTri: client.id }).exec();

          const collaboratorData: CreateClientTriDto = {
            name: client.nombre,
            nit: client.nit,
            idTri: client.id
          };

          if (existingClient) {
            let update = await this.clientsModel.updateOne({ idTri: client.id }, collaboratorData).exec();
          } else {
            const newClient = new this.clientsModel({
              ...collaboratorData,
              idTri: client.id,
            });
            let save = await newClient.save();
          }
        }
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
