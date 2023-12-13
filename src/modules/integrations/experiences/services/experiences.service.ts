/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import axios, {AxiosResponse} from "axios";

@Injectable()
export class ExperiencesService {
    constructor() {}

    async experiencesList(
        numberId: string, //numero_id
        instance: string, //instancia_asignada
        startDate: string, //date_start
        endDate: string, //date_end
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = `https://api.t3rsc.co/api/experiences?instancia=${instance}&numero_id=${numberId}&date_start=${startDate}&date_end=${endDate}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.get(url, config);
        console.log(response.data)
        return response.data.mensaje;
    }

    async experienceDetails(
        itemId: string, //numero_id
        instance: string, //instancia_asignada
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = `https://api.t3rsc.co/api/experiences/${itemId}?instancia=${instance}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.get(url, config);
        console.log(response.data)
        return response.data.mensaje;
    }

    async create(
        instance: string, //instancia
        idNumber: string, //numero_id
        companyName: string, //nombre_empresa
        jobTitle: string, //cargo_desempenado
        specificJobTitle: string, //cargo_especifico
        bossNames: string, //nombres_jefe
        bossTitle: string, //cargo_jefe
        countryId: string, //pais_id
        departmentId: string, //departamento_id
        cityId: string, //ciudad_id
        startDate: string, //fecha_inicio
        currentEmployment: string, //empleo_actual
        dutiesAchievements: string, //funciones_logros
        earnedSalary: string, //salario_devengado
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = 'https://api.t3rsc.co/api/experiences';
        const data = {
            instancia: instance,
            numero_id: idNumber,
            nombre_empresa: companyName,
            cargo_desempenado: jobTitle,
            cargo_especifico: specificJobTitle,
            nombres_jefe: bossNames,
            cargo_jefe: bossTitle,
            pais_id: countryId,
            departamento_id: departmentId,
            ciudad_id: cityId,
            fecha_inicio: startDate,
            empleo_actual: currentEmployment,
            funciones_logros: dutiesAchievements,
            salario_devengado: earnedSalary,
        };
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(url, data, config);
        return response.data;
    }

    async update(
        itemId: string, //item_id
        instance: string, //instancia
        idNumber: string, //numero_id
        companyName: string, //nombre_empresa
        jobTitle: string, //cargo_desempenado
        specificJobTitle: string, //cargo_especifico
        bossNames: string, //nombres_jefe
        bossTitle: string, //cargo_jefe
        countryId: string, //pais_id
        departmentId: string, //departamento_id
        cityId: string, //ciudad_id
        startDate: string, //fecha_inicio
        currentEmployment: string, //empleo_actual
        dutiesAchievements: string, //funciones_logros
        earnedSalary: string, //salario_devengado
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = `https://api.t3rsc.co/api/experiences/${itemId}`;
        const data = {
            instancia: instance,
            numero_id: idNumber,
            nombre_empresa: companyName,
            cargo_desempenado: jobTitle,
            cargo_especifico: specificJobTitle,
            nombres_jefe: bossNames,
            cargo_jefe: bossTitle,
            pais_id: countryId,
            departamento_id: departmentId,
            ciudad_id: cityId,
            fecha_inicio: startDate,
            empleo_actual: currentEmployment,
            funciones_logros: dutiesAchievements,
            salario_devengado: earnedSalary,
        };
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.put(url, data, config);
        return response.data;
    }
}
