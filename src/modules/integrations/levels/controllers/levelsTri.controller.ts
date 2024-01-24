/* eslint-disable prettier/prettier */
import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AxiosResponse} from "axios";
import {LevelsTriService} from "../services/levelsTri.service";

@ApiTags('TRI - Levels')
@Controller('api/levels-tri')
export class LevelsTriController {
    constructor(private readonly levelsTriService: LevelsTriService) {
    }

    @Get()
    @ApiOperation({summary: 'Permite listar los niveles por tipo.'})
    async show(
        @Param('instance') instance: number,
        @Param('startDate') startDate: string,
        @Param('endDate') endDate: string,
        @Param('type') type: number,
        @Param('token') token: string,
    ): Promise<AxiosResponse<any>> {
        return await this.levelsTriService.show(instance, startDate, endDate, type, token);
    }

    @Post()
    @ApiOperation({summary: 'Permite crear un nuevo nivel del tipo indicado.'})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                instance: {type: 'number'},
                description: {type: 'string'},
                code: {type: 'string'},
                type: {type: 'number'},
                token: {type: 'string'},
            },
        },
    })
    async createLevel(
        @Body('instance') instance: number,
        @Body('description') description: string,
        @Body('code') code: string,
        @Body('type') type: number,
        @Body('token') token: string,
    ): Promise<any> {
        return this.levelsTriService.create(
            instance,
            description,
            code,
            type,
            token
        );
    }

    @Post('/client-level')
    @ApiOperation({summary: 'Permite asignar a los clientes niveles de diferentes tipos.'})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                instance: {type: 'string'},
                nit: {type: 'string'},
                description: {type: 'string'},
                payrollCode: {type: 'string'},
                token: {type: 'string'},
            },
        },
    })
    async clientLevel(
        @Body('instance') instance: number,
        @Body('codeLevel') codeLevel: string,
        @Body('typeLevel') typeLevel: number,
        @Body('nit') nit: number,
        @Body('token') token: string,
    ): Promise<any> {
        return this.levelsTriService.clientLevel(
            instance,
            codeLevel,
            typeLevel,
            nit,
            token
        );
    }
}
