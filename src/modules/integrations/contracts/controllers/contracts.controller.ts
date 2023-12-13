/* eslint-disable prettier/prettier */
import {Controller, Get, Param} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AxiosResponse} from "axios";
import {ContractsService} from "../services/contracts.service";

@ApiTags('TRI - Contracts')
@Controller('api/contracts')
export class ContractsController {
    constructor(private readonly contractsService: ContractsService) {
    }

    @Get('/instance-list')
    @ApiOperation({summary: 'List Contracts From Instance'})
    async contractsList(
        @Param('instance') instance: string,
        @Param('startDate') startDate: string,
        @Param('endDate') endDate: string,
        @Param('token') token: string,
    ): Promise<AxiosResponse<any>> {
        return await this.contractsService.instanceList(instance,startDate, endDate, token);
    }

    @Get('/contract-instance')
    @ApiOperation({summary: 'List Specific Contract From Instance'})
    async contractInstance(
        @Param('document') document: string,
        @Param('instance') instance: string,
        @Param('token') token: string,
    ): Promise<AxiosResponse<any>> {
        return await this.contractsService.contractInstance(document, instance, token);
    }
}
