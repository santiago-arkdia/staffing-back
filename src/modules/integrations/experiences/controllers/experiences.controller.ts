/* eslint-disable prettier/prettier */
import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AxiosResponse} from "axios";
import {ExperiencesService} from "../services/experiences.service";

@ApiTags('TRI - Experiences')
@Controller('api/experiences')
export class ExperiencesController {
    constructor(private readonly experiencesService: ExperiencesService) {
    }

    @Get('/list')
    @ApiOperation({summary: 'Permite listar las experiencias de un usuario mediante su documento de identidad'})
    async experiencesList(
        @Param('numberId') numberId: string,
        @Param('instance') instance: string,
        @Param('startDate') startDate: string,
        @Param('endDate') endDate: string,
        @Param('token') token: string,
    ): Promise<AxiosResponse<any>> {
        return await this.experiencesService.experiencesList(numberId, instance, startDate, endDate, token);
    }

    @Get('/experience-details')
    @ApiOperation({summary: 'Permite mostrar los detalles de una experiencia en especifico dado su id'})
    async experienceDetails(
        @Param('itemId') itemId: string,
        @Param('instance') instance: string,
        @Param('token') token: string,
    ): Promise<AxiosResponse<any>> {
        return await this.experiencesService.experienceDetails(itemId, instance, token);
    }

    @Post()
    @ApiOperation({ summary: 'Permite registrar nuevas experiencias laborales de los usuarios' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                instance: { type: 'number' },
                idNumber: { type: 'number' },
                companyName: { type: 'string' },
                jobTitle: { type: 'number' },
                specificJobTitle: { type: 'string' },
                bossNames: { type: 'string' },
                bossTitle: { type: 'string' },
                countryId: { type: 'number' },
                departmentId: { type: 'number' },
                cityId: { type: 'number' },
                startDate: { type: 'date' },
                currentEmployment: { type: 'boolean' },
                dutiesAchievements: { type: 'string' },
                earnedSalary: { type: 'string' },
                token: { type: 'string' }
            },
        },
    })
    async create(
        @Body('instance') instance: string,
        @Body('idNumber') idNumber: string,
        @Body('companyName') companyName: string,
        @Body('jobTitle') jobTitle: string,
        @Body('specificJobTitle') specificJobTitle: string,
        @Body('bossNames') bossNames: string,
        @Body('bossTitle') bossTitle: string,
        @Body('countryId') countryId: string,
        @Body('departmentId') departmentId: string,
        @Body('cityId') cityId: string,
        @Body('startDate') startDate: string,
        @Body('currentEmployment') currentEmployment: string,
        @Body('dutiesAchievements') dutiesAchievements: string,
        @Body('earnedSalary') earnedSalary: string,
        @Body('token') token: string,
    ): Promise<any> {
        return this.experiencesService.create(
            instance,
            idNumber,
            companyName,
            jobTitle,
            specificJobTitle,
            bossNames,
            bossTitle,
            countryId,
            departmentId,
            cityId,
            startDate,
            currentEmployment,
            dutiesAchievements,
            earnedSalary,
            token
        );
    }
    @Put()
    @ApiOperation({ summary: 'Permite modificar una experiencia laboral dado el id registrado en TRI' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                instance: { type: 'number' },
                idNumber: { type: 'number' },
                companyName: { type: 'string' },
                jobTitle: { type: 'number' },
                specificJobTitle: { type: 'string' },
                bossNames: { type: 'string' },
                bossTitle: { type: 'string' },
                countryId: { type: 'number' },
                departmentId: { type: 'number' },
                cityId: { type: 'number' },
                startDate: { type: 'Date' },
                currentEmployment: { type: 'boolean' },
                dutiesAchievements: { type: 'string' },
                earnedSalary: { type: 'string' },
                token: { type: 'string' }
            },
        },
    })
    async update(
        @Param('itemId') itemId: string,
        @Body('instance') instance: string,
        @Body('idNumber') idNumber: string,
        @Body('companyName') companyName: string,
        @Body('jobTitle') jobTitle: string,
        @Body('specificJobTitle') specificJobTitle: string,
        @Body('bossNames') bossNames: string,
        @Body('bossTitle') bossTitle: string,
        @Body('countryId') countryId: string,
        @Body('departmentId') departmentId: string,
        @Body('cityId') cityId: string,
        @Body('startDate') startDate: string,
        @Body('currentEmployment') currentEmployment: string,
        @Body('dutiesAchievements') dutiesAchievements: string,
        @Body('earnedSalary') earnedSalary: string,
        @Body('token') token: string,
    ): Promise<any> {
        return this.experiencesService.update(
            itemId,
            instance,
            idNumber,
            companyName,
            jobTitle,
            specificJobTitle,
            bossNames,
            bossTitle,
            countryId,
            departmentId,
            cityId,
            startDate,
            currentEmployment,
            dutiesAchievements,
            earnedSalary,
            token
        );
    }
}
