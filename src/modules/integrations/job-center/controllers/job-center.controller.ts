/* eslint-disable prettier/prettier */
import {Body, Controller, Post} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {JobCenterService} from "../services/job-center.service";

@ApiTags('TRI - Job Center')
@Controller('api/job-center')
export class JobCenterController {
    constructor(private readonly jobCenterService: JobCenterService) {}

    @Post()
    @ApiOperation({ summary: 'Permite crear centros de trabajo por sociedad' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                instancia: { type: 'number' },
                descripcion: { type: 'string' },
                homologa_id: { type: 'string' },
                empresa_id: { type: 'number' },
                token: { type: 'string' }
            },
        },
    })
    async create(
        @Body('instance') instance: string,
        @Body('description') description: string,
        @Body('homologateId') homologateId: string,
        @Body('companyId') companyId: string,
        @Body('token') token: string,
    ): Promise<any> {
        return this.jobCenterService.create(
            instance,
            description,
            homologateId,
            companyId,
            token
        );
    }
}
