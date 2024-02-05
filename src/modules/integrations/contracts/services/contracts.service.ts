/* eslint-disable prettier/prettier */
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
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
        const url = `http://qa.api.t3rsc.co/api/contracts/${document}?instancia=${instance}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.get(url, config);
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

}
