/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Client } from '../clients/entities/client.entity';
import { AccountingInterfaceService } from './services/generate-accounting-interface.service';
import { DataSource, QueryRunner } from 'typeorm';
import { InjectDatasourceService } from './services/inject-datasource.service';

@Injectable()
export class DatasourcesService {

  constructor(
    private readonly injectDatasourceService: InjectDatasourceService,
    private readonly accountingInterfaceService: AccountingInterfaceService,
    private readonly dataSource: DataSource,
  ) { }



  async create(files: Array<Express.Multer.File>, Client: Client) {

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();


    try {



      await this.injectDatasourceService.injectTemporalAccumulatedExtract(files);
      await this.injectDatasourceService.injectTemporalSS(files);
      const executeStoreProcedure = await this.accountingInterfaceService.generateAccountingInterface();

      // Truncar las tablas temporales

      await queryRunner.query(`TRUNCATE TABLE temporal_accounting_interface;`);
      await queryRunner.query(`TRUNCATE TABLE temporal_ss;`);


      await queryRunner.commitTransaction();

      return {
        response: true,
        data: [
          {
            ulrAccountingInterface: executeStoreProcedure
          }
        ],
        message: `Accounting interface created successfully and file generated successfully for ${Client.name}`,
        statusCode: HttpStatus.CREATED
      }

    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }

  }
}
