/* eslint-disable prettier/prettier */
import {Controller, Get, Param} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AffiliationService} from "../services/affiliation.service";
import {AxiosResponse} from "axios";

@ApiTags('TRI - Affiliation')
@Controller('api/affiliation')
export class AffiliationController {
    constructor(private readonly affiliationService: AffiliationService) {
    }

    @Get()
    @ApiOperation({summary: 'Muestra información del usuario que se ha contratado para ser usada en el registro de afiliaciones.'})
    async show(
        @Param('document') document: string,
        @Param('instance') instance: string,
        @Param('token') token: string,
    ): Promise<AxiosResponse<any>> {
        return await this.affiliationService.show(document, instance, token);
    }
}
