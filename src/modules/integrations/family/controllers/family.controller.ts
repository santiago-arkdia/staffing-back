/* eslint-disable prettier/prettier */
import {Controller, Get, Param} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AxiosResponse} from "axios";
import {FamilyService} from "../services/family.service";

@ApiTags('TRI - Family')
@Controller('api/family')
export class FamilyController {
    constructor(private readonly familyService: FamilyService) {}

    @Get()
    @ApiOperation({summary: 'Permite listar los familiares asociados a un usuario.'})
    async show(
        @Param('identification') identification: string,
        @Param('instance') instance: string,
        @Param('token') token: string,
    ): Promise<AxiosResponse<any>> {
        return await this.familyService.show(identification, instance, token);
    }
}
