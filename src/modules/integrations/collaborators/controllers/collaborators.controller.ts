/* eslint-disable prettier/prettier */
import {Body, Controller, Get, Header, Param, Post, Put} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import { Headers } from '@nestjs/common';
import {AxiosResponse} from "axios";
import { CollaboratorsService } from '../services/collaborators.service';

@ApiTags('TRI - Collaborators')
@Controller('api/collaborators')
export class CollaboratorsController {
    constructor(private readonly collaboratorsService: CollaboratorsService) {
    }

    @Post('/list')
    @ApiOperation({summary: 'Lista el total de usuarios con sus respectivos datos básicos.'})
    async experiencesList(
        @Body('instance') instance: string,
        @Body('startDate') startDate: string,
        @Body('endDate') endDate: string,
        @Headers('x-api-key') token
    ): Promise<AxiosResponse<any>> {
        return await this.collaboratorsService.get(instance, startDate, endDate, token);
    }

}
