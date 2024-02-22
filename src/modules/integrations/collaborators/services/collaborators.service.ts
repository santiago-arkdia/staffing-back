/* eslint-disable prettier/prettier */
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, {AxiosResponse} from "axios";
import { Model } from 'mongoose';
import { CreateCollaboratorTriDto } from 'src/modules/collaborators/dto/create-collaborators-tri.dto';
import { Collaborator } from 'src/modules/collaborators/entities/collaborators.entity';
import { ContractsService } from '../../contracts/services/contracts.service';

@Injectable()
export class CollaboratorsService {
    constructor(@InjectModel(Collaborator.name) private collaboratorModel: Model<Collaborator>,
        private contractsService: ContractsService
    ) {}

    async get(
        instance: string, //instancia
        dateStart: string, //fecha_inicio
        dateEnd: string, //fecha_fin
        token: string
    ): Promise<any> {
        const url = 'http://qa.api.t3rsc.co/api/users';
        const data = {
            instancia: instance,
            date_start: dateStart,
            date_end: dateEnd
        };
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.get(`${url}?instancia=${instance}&date_start=${dateStart}&date_end=${dateEnd}`, config);
            this.syncUsers(response.data.users, instance, dateStart, dateEnd, token);
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

    async syncUsers(users: any[], instance: string, dateStart: string, dateEnd: string, token: string): Promise<void> {
        for (const user of users) {
          const existingCollaborator = await this.collaboratorModel.findOne({ idTri: user.id }).exec();

          

          const collaboratorData: CreateCollaboratorTriDto = {
            name: user.nombres+" "+user.primer_apellido+" "+user.segundo_apellido,
            document: user.numero_documento,
            email: user.correo_electronico,
            documentType: user.tipo_documento,
            idTri: user.id
          };


          if (existingCollaborator) {
            let update = await this.collaboratorModel.updateOne({ idTri: user.id }, collaboratorData).exec();
            // this.contractsService.contractInstance(user.numero_documento, instance, token, update.)
          } else {
            const newCollaborator = new this.collaboratorModel({
              ...collaboratorData,
              idTri: user.id,
            });
            let save = await newCollaborator.save();
            this.contractsService.contractInstance(user.numero_documento, instance, token, save.id)
          }
        }
      }
}
