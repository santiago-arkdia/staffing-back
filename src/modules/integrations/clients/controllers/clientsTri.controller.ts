/* eslint-disable prettier/prettier */
import {Body, Controller, Get, Headers, Param, Post} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AxiosResponse} from "axios";
import {ClientsTriService} from "../services/clientsTri.service";

@ApiTags('TRI - Clients')
@Controller('api/clients-tri')
export class ClientsTriController {
    constructor(private readonly clientsTriService: ClientsTriService) {
    }

    @Post("list")
    @ApiOperation({summary: 'Permite listar todos los clientes de la plataforma. Opcionalmente se pueden usar filtros de fechas de creación de clientes.'})
    async show(
        @Body('instance') instance: string,
        @Body('startDate') startDate: string,
        @Body('endDate') endDate: string,
        @Headers('x-api-key') token
    ): Promise<AxiosResponse<any>> {
        return await this.clientsTriService.show(instance,startDate, endDate, token);
    }

    @Post()
    @ApiOperation({ summary: 'Permite la creación de clientes en el sistema provenientes de fuentes externas.' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                instance: { type: 'string' },
                nit: { type: 'string' },
                name: { type: 'string' },
                address: { type: 'string' },
                phoneNumber: { type: 'string' },
                contact: { type: 'string' },
                email: { type: 'string' },
                homologatedId: { type: 'string' },
                token: { type: 'string' },
            },
        },
    })
    async createClient(
        @Body('instance') instance: string,
        @Body('nit') nit: string,
        @Body('name') name: string,
        @Body('address') address: string,
        @Body('phoneNumber') phoneNumber: string,
        @Body('contact') contact: string,
        @Body('email') email: string,
        @Body('homologatedId') homologatedId: string,
        @Body('token') token: string,
    ): Promise<any> {
        return this.clientsTriService.create(
            instance,
            nit,
            name,
            address,
            phoneNumber,
            contact,
            email,
            homologatedId,
            token
        );
    }

    @Post('/client-payroll')
    @ApiOperation({ summary: 'Permite crear códigos de nómina por clientes.' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                instance: { type: 'string' },
                nit: { type: 'string' },
                description: { type: 'string' },
                payrollCode: { type: 'string' },
                token: { type: 'string' },
            },
        },
    })
    async clientPayroll(
        @Body('instance') instance: string,
        @Body('nit') nit: string,
        @Body('description') description: string,
        @Body('payrollCode') payrollCode: string,
        @Body('token') token: string,
    ): Promise<any> {
        return this.clientsTriService.clientPayroll(
            instance,
            nit,
            description,
            payrollCode,
            token
        );
    }
}
