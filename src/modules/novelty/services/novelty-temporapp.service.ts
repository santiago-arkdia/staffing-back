/* eslint-disable prettier/prettier */
import { Injectable,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Novelty } from '../entities/novelty.entity';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Counter } from "../entities/counter.entity";
import { Concept } from "../../concepts/entities/concepts.entity";
import { Roles } from 'src/modules/roles/entities/roles.entity';

import { NoveltyRetirement } from 'src/modules/novelty-retirement/entities/novelty-retirement.entity';
import { Client } from 'src/modules/clients/entities/client.entity';
import { NoveltySocialSecurity } from 'src/modules/novelty-social-security/entities/novelty-social-security.entity';
import { Payrolls } from 'src/modules/payrolls/entities/payrolls.entity';
import { Model } from 'mongoose';
import { NoveltyMasterTemporappDto } from '../dto/novelty-master-temporapp.dto';


@Injectable()
export class NoveltyTemporAppService {
    constructor(
        @InjectModel(Novelty.name)
        private readonly noveltyModel: Model<Novelty>,
        @InjectModel(NoveltyRetirement.name) private noveltyRetirementModel: Model<NoveltyRetirement>,
        @InjectModel(NoveltySocialSecurity.name) private noveltySocialSecurity: Model<NoveltySocialSecurity>,
        @InjectModel(Counter.name) private counterModel: Model<Counter>,
        @InjectModel(Concept.name) private conceptModel: Model<Concept>,
        @InjectModel(Client.name) private readonly clientModel: Model<Client>,
        @InjectModel(Roles.name) private readonly rolesModel: Model<Roles>,
        @InjectModel(Payrolls.name) private readonly payrollsModel: Model<Payrolls>,
    ) {
    }

   
    async getToken():Promise<string>{
        let responseLogin = '';
        try {
            const response = await axios.post('http://54.245.197.90:9896/ws/usuarios/login', {
                "usuario": "usrStaffingWeb",
                "clave": "L5M6ctb5I@jF"
            })
            responseLogin = response.data.accessToken;
            
            //dataResponse.push(response.data);
        } catch (error) {
            console.log(error.message);
        }
        return responseLogin;
    }

    async createNovelty(novelty:NoveltyMasterTemporappDto){
        const accessToken = await this.getToken();
        const noveltyInfo = await this.noveltyModel.findById(novelty.noveltyId)
            .populate('client')
            .populate('collaborator')
            .exec();
        // console.log(info);
        const url = 'http://54.245.197.90:9896/ws/novedades/maestro';
                    
        const item = {
            "tipoOperacion": 'NovedadNomina',
            "instancia": "staffing",
            "usuarioExterno": noveltyInfo.client.idTri.toString(),
            "datos":{
                "canal": "NELV2",
                "dimension": "0",
                "nitCliente": noveltyInfo.client.nit,
                "idCliente": noveltyInfo.client.idTri,
                "documento": noveltyInfo.collaborator.document,
                ... noveltyInfo.reportingObject                
            }
            
        };
        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const response = await axios.post(url, item, config);
        console.log(item);

        return response.data;

    }
}
