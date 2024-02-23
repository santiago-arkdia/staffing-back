/* eslint-disable prettier/prettier */
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, {AxiosResponse} from "axios";
import { Model } from 'mongoose';
import { Client } from 'src/modules/clients/entities/client.entity';
import { Collaborator } from 'src/modules/collaborators/entities/collaborators.entity';
import { CreateContractDto } from 'src/modules/contracts/dto/create-contracts.dto';
import { Contract } from 'src/shared/models/contract';

@Injectable()
export class ContractsService {
    constructor(@InjectModel(Contract.name) private contractModel: Model<Contract>,
                @InjectModel(Client.name) private clientModel: Model<Client>,
                @InjectModel(Collaborator.name) private collaboratorModel: Model<Collaborator>) {}

    async instanceList(
        instance: string, //instancia_asignada
        startDate: string, //date_start
        endDate: string, //date_end
        token: string
    ): Promise<AxiosResponse<any>> {
        const url = `https://api.t3rsc.co/api/contracts?instancia=${instance}&date_start=${startDate}&date_end=${endDate}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.get(url, config);
        return response.data;
    }

    async contractInstance(
        document: string, //number_document
        instance: string, //instancia_asignada
        token: string,
        collaborator: string
    ): Promise<AxiosResponse<any>> {
        const url = `http://qa.api.t3rsc.co/api/contracts/${document}?instancia=${instance}`;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.get(url, config);
            this.syncContracts(response.data.contract, collaborator)
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Error making the request:', error.response.data);
                throw new HttpException({
                    status: error.response.status,
                    error: error.response.data,
                }, HttpStatus.UNPROCESSABLE_ENTITY); 
            } else if (error.request) {
                console.error('The request was made but no response was received', error.request);
                throw new HttpException('No response from server', HttpStatus.SERVICE_UNAVAILABLE);
            } else {
                console.error('Error', error.message);
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async syncContracts(contract: any, collaborator: string): Promise<void> {
          const existingContract = await this.contractModel.findOne({ idTri: contract.id }).exec();
          const client = await this.clientModel.findOne({ nit: contract.cliente }).exec();
          const collaboratorUpdate = await this.collaboratorModel.updateOne({_id: collaborator},{ client: client.id }).exec();


          const contractData: CreateContractDto = {
            contractCode: contract.codigo_contrato,
            contractType: contract.tipo_contrato,
            settlementType: contract.tipo_liquidacion,
            paymentFrequency: contract.periocidad_pago,
            client: client.id,
            collaborator: collaborator, 
            pensionFund: contract.fondo_pensiones,
            epsEntity: contract.entidad_eps,
            severanceFund: contract.fondo_cesantias,
            compensationFund: contract.caja_compensacion,
            workCity: contract.ciudad_labor,
            riskGrade: contract.grado_riesgo,
            transportationAssistance: contract.auxilio_transporte,
            contractStartDate: contract.fecha_inicio_contrato,
            probableRetirementDate: contract.fecha_probable_retiro,
            contractEndDate: contract.estado_contrato,
            arl: contract.arl,
            idTri: contract.id
          };

          if (existingContract) {
            let update = await this.contractModel.updateOne({ idTri: contract.id }, contractData).exec();
          } else {
            const newContract = new this.contractModel({
              ...contractData,
              idTri: contract.id,
            });
            let save = await newContract.save();
          }
        
      }

}
