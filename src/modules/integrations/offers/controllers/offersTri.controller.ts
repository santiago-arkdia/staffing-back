/* eslint-disable prettier/prettier */
import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AxiosResponse} from "axios";
import {OffersTriService} from "../services/offersTri.service";

@ApiTags('TRI - Offers')
@Controller('api/offers-tri')
export class OffersTriController {
    constructor(private readonly offersTriService: OffersTriService) {
    }

    @Get()
    @ApiOperation({summary: 'Permite listar la información de las ofertas(requerimientos) filtrando por una serie de parametros'})
    async show(
        @Param('instance') instance: number,
        @Param('startDate') startDate: string,
        @Param('endDate') endDate: string,
        @Param('chargeId') chargeId: number,
        @Param('clientId') clientId: number,
        @Param('token') token: string,
    ): Promise<AxiosResponse<any>> {
        return await this.offersTriService.show(instance, startDate, endDate, chargeId, clientId, token);
    }
    @Post('/offer-apply')
    @ApiOperation({summary: 'Permite que un usuario pueda aplicar a una oferta.'})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                instance: {type: 'number'},
                reqId: {type: 'number'},
                numberId: {type: 'number'},
                token: {type: 'string'},
            },
        },
    })
    async applyOffer(
        @Body('instance') instance: number,
        @Body('reqId') reqId: string,
        @Body('numberId') numberId: number,
        @Body('token') token: string,
    ): Promise<any> {
        return this.offersTriService.applyOffer(
            instance,
            reqId,
            numberId,
            token
        );
    }
}
