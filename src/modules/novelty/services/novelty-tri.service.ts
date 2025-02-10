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
export class NoveltyTriService {
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

   
    async getToken(){
        let responseLogin = '';
        try {
            const response = await axios.post('https://qa.api.t3rsc.co/api/login', {
                "email": "samuel@tecnopac.com.co",
                "password": "Tecnop@acTr1"
            })
            responseLogin = response.data.access_token;
            
        } catch (error) {
            
            console.log("aca"+error.message);
        }
        return responseLogin;
    }

    async createNovelty(noveltyId){
        const accessToken = await this.getToken();
        const noveltyInfo = await this.noveltyModel.findById(noveltyId)
            .populate('client')
            // .populate('collaborator')
            .populate({
                path: 'collaborator',
                populate: {
                    path: 'utilityCenter',
                    populate: {
                      path: 'region',
                    }
                },
              })
            .populate('concept')
            .exec();
        console.log("aca arranca");
        console.log(noveltyInfo.collaborator.utilityCenter);
        const url = 'https://qa.api.t3rsc.co/api/sending-document';
        const itemTri = {
            "instancia": "26",
            "category_code": this.getCodeTri(noveltyInfo.concept,noveltyInfo.reportingObject.concepto),
            "A":noveltyInfo.collaborator.name,
            // "B":noveltyInfo.collaborator.document,
            "B": "1005479634",
            "D":noveltyInfo.collaborator.utilityCenter.region.name,
            ...this.getItemsTri(noveltyInfo.concept,noveltyInfo.reportingObject)
        }
        console.log(itemTri);
        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        let response: { data: any } = { data: { init: {} } };
        try {
            
           response = await axios.post(url, itemTri, config);
           console.log(response);
        } catch (error) {
            console.log(error);
            response = {data:{message:error.message}};
        }

        return {data:itemTri,response:response.data};

    }

    /**
     * Obtiene el codigo la categoria
     * @param concept 
     * @param codeOption 
     * @returns 
     */
    getCodeTri(concept,codeOption){
        const code = concept.formObject[0].options.filter(option => option.key == codeOption)
        .map(option => option.categoryTri);
        return code[0]
    }

    /**
     * 
     * @param concept 
     * @param optionsNovelty 
     * @returns 
     */
    getItemsTri(concept,optionsNovelty){
        const result = {};
        concept.formObject.filter(option => option.hasOwnProperty('codeTri'))
            .map(option => {
                if(option.type === 'select'){
                    const optionValue = option.options.filter(optionValue => optionValue.key == optionsNovelty[option.id] ) 
                    .map(optionValue => optionValue.value);

                    result[option.codeTri] = optionValue[0] ;
                }else{
                    result[option.codeTri]= optionsNovelty[option.id] ;
                }
            });
        return result;
    }
}
