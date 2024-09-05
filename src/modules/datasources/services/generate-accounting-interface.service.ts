/* eslint-disable prettier/prettier */

import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import * as XLSX from 'xlsx';
import { AccountingInterface } from 'src/modules/datasources/entities/temporal-accounting-interface.entity';
import * as AWS from 'aws-sdk';  // Importar AWS SDK para la configuración
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccountingInterfaceService {
  private readonly ACCOUNTING_INTERFACE_SP_PROCEDURE_SQL: string = process.env.ACCOUNTING_INTERFACE_SP_PROCEDURE_SQL;
  private readonly BUCKET_NAME: string = process.env.BUCKET_NAME;
  private readonly ACCESS_KEY: string = process.env.ACCESS_KEY;
  private readonly SECRET_KEY: string = process.env.SECRET_KEY;
  private readonly ZONE: string = process.env.ZONE;

  private s3: AWS.S3;

  constructor(
    @InjectRepository(AccountingInterface)
    private readonly accountingInterfaceRepository: Repository<AccountingInterface>,
    private readonly configService: ConfigService,
  ) {

    AWS.config.update({
      accessKeyId: this.ACCESS_KEY,
      secretAccessKey: this.SECRET_KEY,
      region: this.ZONE,
    });

    this.s3 = new AWS.S3();

    this.validateS3Connection().catch(error => {
      console.error('Error al conectar con el bucket S3:', error);
      process.exit(1); 
    });
  }

  private async validateS3Connection(): Promise<void> {
    try {
      const data = await this.s3.listObjectsV2({ Bucket: this.BUCKET_NAME }).promise();
      console.log('Conexión al bucket S3 verificada. Objetos en el bucket:', data.Contents?.length || 0);
    } catch (error) {
      throw new Error(`No se pudo conectar al bucket S3: ${error.message}`);
    }
  }

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

      const uploadParams = {
        Bucket: this.BUCKET_NAME,
        Key: 'accounting_interface.xlsx',
        Body: excelBuffer,
        ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };

      const data = await this.s3.upload(uploadParams).promise();
      console.log(`Archivo Excel subido a S3 en: ${data.Location}`);

      await queryRunner.manager.clear(AccountingInterface);
      await queryRunner.commitTransaction();

      return data.Location;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error al ejecutar el stored procedure:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
