/* eslint-disable prettier/prettier */
import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AxiosResponse} from "axios";
import {PositionsTriService} from "../services/positionsTri.service";

@ApiTags('TRI - Offers')
@Controller('api/offers-tri')
export class PositionsTriController {
    constructor(private readonly positionsTriService: PositionsTriService) {
    }

    @Get()
    @ApiOperation({summary: 'Permite listar los cargos creados en la plataforma. Se puede filtar por cliente, estado del cargo y fechas de creación.'})
    async show(
        @Param('instance') instance: number,
        @Param('clientId') clientId: number,
        @Param('active') active: boolean,
        @Param('startDate') startDate: string,
        @Param('endDate') endDate: string,
        @Param('token') token: string,
    ): Promise<AxiosResponse<any>> {
        return await this.positionsTriService.show(instance, startDate, endDate, clientId, active, token);
    }

    @Get()
    @ApiOperation({summary: 'Permite ver la información de un cargo en especifico. El parámetro de la URL es el ID del cargo'})
    async showSpecific(
        @Param('instance') instance: number,
        @Param('itemId') itemId: string,
        @Param('token') token: string,
    ): Promise<AxiosResponse<any>> {
        return await this.positionsTriService.showSpecific(instance, itemId, token);
    }
    @Post()
    @ApiOperation({summary: 'Permite crear un nuevo cargo'})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                instance: {type: 'number'},
                description: {type: 'string'},
                code1: {type: 'string'},
                cltCode: {type: 'number'},
            },
        },
    })
    async store(
        @Body('instance') instance: number,
        @Body('description') description: string,
        @Body('code1') code1: string,
        @Body('cltCode') cltCode: number,
        @Body('token') token: string,
    ): Promise<any> {
        return this.positionsTriService.store(
            instance,
            description,
            code1,
            cltCode,
            token
        );
    }
}
