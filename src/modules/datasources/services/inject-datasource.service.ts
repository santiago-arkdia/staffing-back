/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemporalAccumulatedExtract } from 'src/modules/datasources/entities/temporal-accumulated-extract.entity';
import { TemporalSS } from 'src/modules/datasources/entities/temporal-ss.entity';
import { EntityManager, Repository, DataSource } from 'typeorm';
import * as XLSX from 'xlsx';

@Injectable()
export class InjectDatasourceService {

    private ACUMULADO_FILE: string = '';
    private SS_FILE: string = '';



    constructor(
        @InjectRepository(TemporalAccumulatedExtract)
        private readonly tempAccumulatedRepo: Repository<TemporalAccumulatedExtract>,

        @InjectRepository(TemporalSS)
        private readonly temporalSSRepo: Repository<TemporalSS>,

        private readonly dataSource: DataSource



    ) { }

    public excelDateToJSDate(serial: number): Date {
        const days = Math.floor(serial - 25569);
        const milliseconds = days * 86400 * 1000;
        const date = new Date(milliseconds);
        const offset = date.getTimezoneOffset() * 60 * 1000;
        return new Date(milliseconds + offset);
    }


    public async injectTemporalAccumulatedExtract(files: Array<Express.Multer.File>): Promise<TemporalAccumulatedExtract[]> {

        // Sobreescibir el archivo temporal y de seguridad social.
        if (files.length > 0) {
            this.ACUMULADO_FILE = files[0].originalname;
            console.log('Nombre del archivo dinámicamente asignado:', this.ACUMULADO_FILE);
        } else {
            throw new BadRequestException(`No found ${this.ACUMULADO_FILE} file, the name of the file must be ${this.ACUMULADO_FILE}, please try again.`);
        }


        // Encontrar el archivo específico ACUMULADO.xlsx
        const acumuladoFile = files.find(file => file.originalname === this.ACUMULADO_FILE);
        if (!acumuladoFile) {
            throw new BadRequestException(`No found ${this.ACUMULADO_FILE} file, please try again.`);
        }

        const workbook = XLSX.read(acumuladoFile.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Obtener los datos de la hoja de cálculo excluyendo la primera fila
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });

        if (!jsonData || jsonData.length === 0) {
            throw new BadRequestException(`No data found in ${this.ACUMULADO_FILE} file, please try again.`);
        }

        // Mapear los datos a objetos de TemporalAccumulatedExtract
        const data: TemporalAccumulatedExtract[] = jsonData.map(row => {
            const tempAccumulated = new TemporalAccumulatedExtract();
            tempAccumulated.IdentificacionCliente = row[0] || null;
            tempAccumulated.NombreCliente = row[1] || null;
            tempAccumulated.Agencia = row[2] || null;
            tempAccumulated.IdCentroCosto = row[3] || null;
            tempAccumulated.NombreCentroCosto = row[4] || null;
            tempAccumulated.EstadoVinculacion = row[5] || null;
            tempAccumulated.TipoContrato = row[6] || null;
            tempAccumulated.NoContrato = row[7] || null;
            tempAccumulated.IdentificacionColaborador = row[8] || null;
            tempAccumulated.NombreColaborador = row[9] || null;
            tempAccumulated.Cargo = row[10] || null;
            tempAccumulated.Jornada = row[11] || null;
            tempAccumulated.Basico = row[12] || null;
            tempAccumulated.TipoSalario = row[13] || null;
            tempAccumulated.FechaInicio = row[14] || null;
            tempAccumulated.FechaFin = row[15] || null;
            tempAccumulated.NoNomina = row[16] || null;
            tempAccumulated.Ano = row[17] || null;
            tempAccumulated.Mes = row[18] || null;
            tempAccumulated.PeriodoNominal = row[19] || null;
            tempAccumulated.CodConcepto = row[20] || null;
            tempAccumulated.NombreConcepto = row[21] || null;
            tempAccumulated.ClaseConc = row[22] || null;
            tempAccumulated.MedidaConcepto = row[23] || null;
            tempAccumulated.SubConcepto = row[24] || null;
            tempAccumulated.Ajuste = row[25] || null;
            tempAccumulated.CantidadUnidades = row[26] || 0;
            tempAccumulated.Valor = row[27] || 0;
            tempAccumulated.Liquidacion = row[28] || null;
            tempAccumulated.NoDocumentoIncapacidad = row[29] || null;
            tempAccumulated.FechaInicioIncapacidad = row[30] || null;
            tempAccumulated.FechaFinIncapacidad = row[31] || null;
            tempAccumulated.NoCuenta = row[32] || null;
            tempAccumulated.Banco = row[33] || null;
            tempAccumulated.Facturable = row[34] || null;
            tempAccumulated.BaseParaImpuestos = row[35] || null;
            tempAccumulated.CodigoCCNovedad = row[36] || null;
            tempAccumulated.NombreCCNovedad = row[37] || null;
            tempAccumulated.Aiu = row[38] || null;
            tempAccumulated.NoFactura = row[39] || null;
            tempAccumulated.FechaEmision = row[40] || null;
            tempAccumulated.LoteGerencia = row[41] || null;
            tempAccumulated.FechaDePago = row[42] || null;
            tempAccumulated.Grupo = row[43] || null;
            tempAccumulated.PerPermanencia = row[44] || null;
            tempAccumulated.PagDocNumero = row[45] || null;
            tempAccumulated.HomologacionNE = row[46] || null;
            return tempAccumulated;
        });

        // Guardar los datos en la base de datos en lotes en paralelo
        const batchSize = 1000;
        const numBatches = Math.ceil(data.length / batchSize);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        try {
            await queryRunner.startTransaction();

            // Guardar los datos en lotes en paralelo
            await Promise.all(Array.from({ length: numBatches }, async (_, index) => {
                const start = index * batchSize;
                const end = Math.min(start + batchSize, data.length);
                const batch = data.slice(start, end);
                await queryRunner.manager.save(TemporalAccumulatedExtract, batch);
            }));

            await queryRunner.commitTransaction();
            console.log(`Datos de archivo ${this.ACUMULADO_FILE} guardados exitosamente en la base de datos.`);
            return data;

        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error al guardar los datos en la base de datos:', error);

            try {
                // Truncar la tabla en caso de error
                await queryRunner.query(`TRUNCATE TABLE ${this.tempAccumulatedRepo.metadata.tableName}`);
                await queryRunner.query(`TRUNCATE TABLE ${this.temporalSSRepo.metadata.tableName}`);

                console.log(`Tabla ${this.tempAccumulatedRepo.metadata.tableName} truncada exitosamente.`);
            } catch (truncateError) {
                console.error('Error al truncar la tabla:', truncateError);
            }

            throw new Error(`Error al guardar datos en la base de datos desde el archivo ${this.ACUMULADO_FILE} ` + error);

        } finally {
            await queryRunner.release();
        }
    }


    public async injectTemporalSS(files: Array<Express.Multer.File>): Promise<TemporalSS[]> {

        // Sobreescibir el archivo temporal y de seguridad social.
        if (files.length > 0) {
            this.SS_FILE = files[1].originalname;
            console.log('Nombre del archivo dinámicamente asignado:', this.SS_FILE);
        } else {
            throw new BadRequestException(`No found ${this.SS_FILE} file, the name of the file must be ${this.SS_FILE}, please try again.`);
        }


        const ssFile = files.find(file => file.originalname === this.SS_FILE);
        if (!ssFile) {
            throw new BadRequestException(`No se encontro el archivo ${this.SS_FILE}.`);
        }

        const workbook = XLSX.read(ssFile.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];


        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });



        if (!jsonData || jsonData.length === 0) {
            throw new BadRequestException(`No se encontraron datos en el archivo ${this.SS_FILE}.`);
        }
        // Mapear los datos a objetos de TemporalSS
        const data: TemporalSS[] = jsonData.map(row => {
            const tempSS = new TemporalSS();

            tempSS.TipoId = row[0] || null;  // Ajustado a 0
            tempSS.NoId = row[1] || null;
            tempSS.NombreEmpleado = row[2] || null;
            tempSS.TipoCotizante = row[3] || null;
            tempSS.HorasLaboradas = row[4] || null;
            tempSS.Extranjero = row[5] || null;
            tempSS.TempExt = row[6] || null;
            tempSS.FechaRadicacionEnElExterior = row[7] || null;
            tempSS.IngNovedades = row[8] || null;
            tempSS.FechaIngNovedades = row[9] ? this.excelDateToJSDate(row[9]) : null;
            tempSS.RetNovedades = row[10] || null;
            tempSS.FechaRetNovedades = row[11] ? this.excelDateToJSDate(row[11]) : null;
            tempSS.TdeNovedades = row[12] || null;
            tempSS.TaeNovedades = row[13] || null;
            tempSS.TdpNovedades = row[14] || null;
            tempSS.TapNovedades = row[15] || null;
            tempSS.VspNovedades = row[16] || null;
            tempSS.FechaInicioVspNovedades = row[17] ? this.excelDateToJSDate(row[17]) : null;
            tempSS.CorNovedades = row[18] || null;
            tempSS.VstNovedades = row[19] || null;
            tempSS.SlnNovedades = row[20] || null;
            tempSS.FechaInicioSlnNovedades = row[21] ? this.excelDateToJSDate(row[21]) : null;
            tempSS.FechaFinSlnNovedades = row[22] ? this.excelDateToJSDate(row[22]) : null;
            tempSS.IgeNovedades = row[23] || null;
            tempSS.FechaInicioIgeNovedades = row[24] ? this.excelDateToJSDate(row[24]) : null;
            tempSS.FechaFinIgeNovedades = row[25] ? this.excelDateToJSDate(row[25]) : null;
            tempSS.LmaNovedades = row[26] || null;
            tempSS.FechaInicioLmaNovedades = row[27] ? this.excelDateToJSDate(row[27]) : null;
            tempSS.FechaFinLmaNovedades = row[28] ? this.excelDateToJSDate(row[28]) : null;
            tempSS.VacLrNovedades = row[29] || null;
            tempSS.FechaInicioVacLrNovedades = row[30] ? this.excelDateToJSDate(row[30]) : null;
            tempSS.FechaFinVacLrNovedades = row[31] ? this.excelDateToJSDate(row[31]) : null;
            tempSS.AvpNovedades = row[32] || null;
            tempSS.VctNovedades = row[33] || null;
            tempSS.FechaInicioVctNovedades = row[34] ? this.excelDateToJSDate(row[34]) : null;
            tempSS.FechaFinVctNovedades = row[35] ? this.excelDateToJSDate(row[35]) : null;
            tempSS.IrlNovedades = row[36] || null;
            tempSS.FechaInicioIrlNovedades = row[37] ? this.excelDateToJSDate(row[37]) : null;
            tempSS.FechaFinIrlNovedades = row[38] ? this.excelDateToJSDate(row[38]) : null;
            tempSS.VipNovedades = row[39] || null;
            tempSS.ValorSalario = row[40] || 0;
            tempSS.IntegralSalario = row[41] || null;
            tempSS.TipoSalario = row[42] || null;
            tempSS.AdministradoraPension = row[43] || null;
            tempSS.DiasPension = row[44] || null;
            tempSS.IBCPension = row[45] || 0;
            tempSS.TarifaPension = row[46] || 0;
            tempSS.TarifaAltoRiesgoPension = row[47] || null;
            tempSS.ValorCotizacionPension = row[48] || 0;
            tempSS.CotizacionVoluntariaEmpleadorPension = row[49] || 0;
            tempSS.CotizacionVoluntariaAfiliadoPension = row[50] || 0;
            tempSS.FondoSolidaridadPensional = row[51] || 0;
            tempSS.FondoSubsistenciaPension = row[52] || 0;
            tempSS.ValorNoRetenidoPension = row[53] || 0;
            tempSS.TotalPension = row[54] || 0;
            tempSS.AFPDestinoPension = row[55] || null;
            tempSS.AdministradoraSalud = row[56] || null;
            tempSS.DiasSalud = row[57] || 0;
            tempSS.IBCSalud = row[58] || 0;
            tempSS.TarifaSalud = row[59] || 0;
            tempSS.ValorCotizacionSalud = row[60] || 0;
            tempSS.ValorUPCSalud = row[61] || 0;
            tempSS.TotalSalud = row[62] || 0;
            tempSS.EPSDestinoSalud = row[63] || null;
            tempSS.AdministradoraCCF = row[64] || null;
            tempSS.DiasCCF = row[65] || null;
            tempSS.IBCCCF = row[66] || 0;
            tempSS.TarifaCCF = row[67] || 0;
            tempSS.ValorCotizacionCCF = row[68] || 0;
            tempSS.AdministradoraRiesgos = row[69] || null;
            tempSS.DiasRiesgos = row[70] || null;
            tempSS.IBCRiesgos = row[71] || 0;
            tempSS.TarifaRiesgos = row[72] || 0;
            tempSS.ClaseRiesgoRiesgos = row[73] || null;
            tempSS.ValorCotizacionRiesgos = row[74] || 0;
            tempSS.DiasParafiscales = row[75] || null;
            tempSS.IBCParafiscales = row[76] || 0;
            tempSS.TarifaSENAParafiscales = row[77] || 0;
            tempSS.ValorCotizacionSENAParafiscales = row[78] || 0;
            tempSS.TarifaICBFParafiscales = row[79] || 0;
            tempSS.ValorCotizacionICBFParafiscales = row[80] || 0;
            tempSS.TarifaESAPParafiscales = row[81] || 0;
            tempSS.ValorCotizacionESAPParafiscales = row[82] || 0;
            tempSS.TarifaMENParafiscales = row[83] || 0;
            tempSS.ValorCotizacionMENParafiscales = row[84] || 0;
            tempSS.ExoneradoSENAeICBFParafiscales = row[85] || null;

            return tempSS;
        });



        console.log(data);

        let entityManager: EntityManager;

        try {
            // Obtener un EntityManager para manejar la transacción
            entityManager = this.temporalSSRepo.manager;
            await entityManager.transaction(async entityManager => {
                // Guardar los datos en lotes en paralelo
                await Promise.all(data.map(async tempSS => {
                    await entityManager.save(TemporalSS, tempSS);
                }));
            });

            console.log(`Datos de archivo ${this.SS_FILE} guardados exitosamente en la base de datos.`);
            return data;

        } catch (error) {
            await entityManager.transaction(async entityManager => {
                await entityManager.query(`TRUNCATE TABLE ${this.tempAccumulatedRepo.metadata.tableName};`);
                await entityManager.query(`TRUNCATE TABLE ${this.temporalSSRepo.metadata.tableName};`);
            })
            console.error('Error al guardar los datos en la base de datos:', error);
            throw new Error(`No se encontraron datos en el archivo ${this.SS_FILE}.` + error);

        }
    }
}


