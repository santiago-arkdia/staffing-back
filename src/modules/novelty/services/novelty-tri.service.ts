/* eslint-disable prettier/prettier */
import { Injectable,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Novelty } from '../entities/novelty.entity';
import axios, { AxiosRequestConfig } from "axios";
import { Counter } from "../entities/counter.entity";
import { Concept } from "../../concepts/entities/concepts.entity";
import { Roles } from 'src/modules/roles/entities/roles.entity';

import { NoveltyRetirement } from 'src/modules/novelty-retirement/entities/novelty-retirement.entity';
import { Client } from 'src/modules/clients/entities/client.entity';
import { NoveltySocialSecurity } from 'src/modules/novelty-social-security/entities/novelty-social-security.entity';
import { Payrolls } from 'src/modules/payrolls/entities/payrolls.entity';
import { Model } from 'mongoose';
// import { NoveltyMasterTemporappDto } from '../dto/novelty-master-temporapp.dto';


@Injectable()
export class NoveltyTriAppService {
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
            const response = await axios.post('https://qa.api.t3rsc.co/api/login', {
                "email": "samuel@tecnopac.com.co",
                "clave": "Tecnop@acTr1"
            })
            responseLogin = response.data.accessToken;
        } catch (error) {
            console.log(error.message);
        }
        return responseLogin;
    }

    async createNovelty(noveltyId){
        const accessToken = await this.getToken();
        const noveltyInfo = await this.noveltyModel.findById(noveltyId)
            .populate('client')
            .populate('collaborator')
            .exec();
        // console.log(info);
        const url = 'https://qa.api.t3rsc.co/api/sending-document';
                    
        const item = {
            "tipoOperacion": noveltyInfo.typeNovelty,
            "instancia": "pruebas",
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
        let response: { data: any } = { data: { init: {} } };
        try {
            
           response = await axios.post(url, item, config);
        } catch (error) {
            response = {data:{message:error.message}};
        }

        return {data:item,response:response.data};

    }
}
