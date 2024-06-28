/* eslint-disable prettier/prettier */

import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import * as XLSX from 'xlsx';
import { AccountingInterface } from 'src/modules/datasources/entities/temporal-accounting-interface.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccountingInterfaceService {
  private readonly ACCOUNTING_INTERFACE_SP_PROCEDURE_SQL: string = process.env.ACCOUNTING_INTERFACE_SP_PROCEDURE_SQL;
  constructor(
    @InjectRepository(AccountingInterface)
    private readonly accountingInterfaceRepository: Repository<AccountingInterface>,
    @Inject('S3') private readonly s3: S3,
    private readonly configService: ConfigService,
  ) {}

  async generateAccountingInterface(): Promise<string> {
    const queryRunner: QueryRunner = this.accountingInterfaceRepository.manager.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await queryRunner.query(`CALL ${this.ACCOUNTING_INTERFACE_SP_PROCEDURE_SQL}();`);

      console.log('Stored procedure ejecutado correctamente.');

      const prepareData = await queryRunner.manager.find(AccountingInterface);

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(prepareData);
      XLSX.utils.book_append_sheet(wb, ws, 'Accounting Interface');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

      const bucketName = this.configService.get<string>('BUCKET_NAME');
      const uploadParams = {
        Bucket: bucketName,
        Key: 'accounting_interface.xlsx',
        Body: excelBuffer,
        ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };

      // const data = await this.s3.upload(uploadParams).promise();
      // console.log(`Archivo Excel subido a S3 en: ${data.Location}`);

      await queryRunner.manager.clear(AccountingInterface);
      await queryRunner.commitTransaction();

      // return data.Location;
      return 'accounting_interface.xlsx';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error al ejecutar el stored procedure:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
