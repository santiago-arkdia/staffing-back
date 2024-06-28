/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemporalAccumulatedExtract } from 'src/modules/datasources/entities/temporal-accumulated-extract.entity';
import { TemporalSS } from 'src/modules/datasources/entities/temporal-ss.entity';
import { EntityManager, Repository, DataSource } from 'typeorm';
import * as XLSX from 'xlsx';

@Injectable()
export class InjectDatasourceService {

    private readonly ACUMULADO_FILE: string = 'ACUMULADO.xlsx';
    private readonly SS_FILE: string = 'SS_MHS.xlsx';



    constructor(
        @InjectRepository(TemporalAccumulatedExtract)
        private readonly tempAccumulatedRepo: Repository<TemporalAccumulatedExtract>,

        @InjectRepository(TemporalSS)
        private readonly temporalSSRepo: Repository<TemporalSS>,

        private readonly dataSource: DataSource



    ) { }

    public async injectTemporalAccumulatedExtract(files: Array<Express.Multer.File>): Promise<TemporalAccumulatedExtract[]> {




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
            tempAccumulated.FechaInicio = row[14]?.trim() || null;
            tempAccumulated.FechaFin = row[15]?.trim() || null;
            tempAccumulated.NoNomina = row[16] || null;
            tempAccumulated.Ano = row[17] ? parseInt(row[17], 10) : null;
            tempAccumulated.Mes = row[18] || null;
            tempAccumulated.PeriodoNominal = row[19] || null;
            tempAccumulated.CodConcepto = row[20] || null;
            tempAccumulated.NombreConcepto = row[21] || null;
            tempAccumulated.ClaseConc = row[22] || null;
            tempAccumulated.MedidaConcepto = row[23] || null;
            tempAccumulated.SubConcepto = row[24] || null;
            tempAccumulated.Ajuste = row[25] || null;
            tempAccumulated.CantidadUnidades = row[26] || null;
            tempAccumulated.Valor = row[27] || null;
            tempAccumulated.Liquidacion = row[28] || null;
            tempAccumulated.NoDocumentoIncapacidad = row[29] || null;
            tempAccumulated.FechaInicioIncapacidad = row[30]?.trim() || null;
            tempAccumulated.FechaFinIncapacidad = row[31]?.trim() || null;
            tempAccumulated.NoCuenta = row[32] || null;
            tempAccumulated.Banco = row[33] || null;
            tempAccumulated.Facturable = row[34] || null;
            tempAccumulated.BaseParaImpuestos = row[35] || null;
            tempAccumulated.CodigoCCNovedad = row[36] || null;
            tempAccumulated.NombreCCNovedad = row[37] || null;
            tempAccumulated.Aiu = row[38] || null;
            tempAccumulated.NoFactura = row[39] || null;
            tempAccumulated.FechaEmision = row[40]?.trim() || null;
            tempAccumulated.LoteGerencia = row[41] || null;
            tempAccumulated.FechaDePago = row[42]?.trim() || null;
            tempAccumulated.Grupo = row[43] || null;
            tempAccumulated.PerPermanencia = row[44] || null;
            tempAccumulated.PagDocNumero = row[45] || null;
            tempAccumulated.HomologacionNE = row[46] || null;
            return tempAccumulated;
        });

        console.log(data);

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
            throw new Error('Error al guardar datos en la base de datos desde el archivo ACUMULADO.xlsx: ' + error);
        } finally {
            await queryRunner.release();
        }
    }

    public async injectTemporalSS(files: Array<Express.Multer.File>): Promise<TemporalSS[]> {
        const ssFile = files.find(file => file.originalname ===  this.SS_FILE);
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

            tempSS.TipoId = row[1] ? row[1].toString() : null;
            tempSS.NoId = row[2] ? row[2].toString() : null;
            tempSS.NombreEmpleado = row[3] ? row[3].toString() : null;
            tempSS.TipoCotizante = row[4] ? row[4].toString() : null;
            tempSS.HorasLaboradas = row[5] ? row[5].toString() : null;
            tempSS.Extranjero = row[6] ? row[6].toString() : null;
            tempSS.TempExt = row[7] ? row[7].toString() : null;
            tempSS.FechaRadicacionEnElExterior = row[8] ? new Date(row[8]) : null;
            tempSS.IngNovedades = row[9] ? row[9].toString() : null;
            tempSS.FechaIngNovedades = row[10] ? new Date(row[10]) : null;
            tempSS.RetNovedades = row[11] ? row[11].toString() : null;
            tempSS.FechaRetNovedades = row[12] ? new Date(row[12]) : null;
            tempSS.TdeNovedades = row[13] ? row[13].toString() : null;
            tempSS.TaeNovedades = row[14] ? new Date(row[14]) : null;
            tempSS.TdpNovedades = row[15] ? row[15].toString() : null;
            tempSS.TapNovedades = row[16] ? row[16].toString() : null;
            tempSS.VspNovedades = row[17] ? row[17].toString() : null;
            tempSS.FechaInicioVspNovedades = row[18] ? new Date(row[18]) : null;
            tempSS.CorNovedades = row[19] ? row[19].toString() : null;
            tempSS.VstNovedades = row[20] ? row[20].toString() : null;
            tempSS.SlnNovedades = row[21] ? row[21].toString() : null;
            tempSS.FechaInicioSlnNovedades = row[22] ? new Date(row[22]) : null;
            tempSS.FechaFinSlnNovedades = row[23] ? new Date(row[23]) : null;
            tempSS.IgeNovedades = row[24] ? row[24].toString() : null;
            tempSS.FechaInicioIgeNovedades = row[25] ? new Date(row[25]) : null;
            tempSS.FechaFinIgeNovedades = row[26] ? new Date(row[26]) : null;
            tempSS.LmaNovedades = row[27] ? row[27].toString() : null;
            tempSS.FechaInicioLmaNovedades = row[28] ? new Date(row[28]) : null;
            tempSS.FechaFinLmaNovedades = row[29] ? new Date(row[29]) : null;
            tempSS.VacLrNovedades = row[30] ? row[30].toString() : null;
            tempSS.FechaInicioVacLrNovedades = row[31] ? new Date(row[31]) : null;
            tempSS.FechaFinVacLrNovedades = row[32] ? new Date(row[32]) : null;
            tempSS.AvpNovedades = row[33] ? row[33].toString() : null;
            tempSS.VctNovedades = row[34] ? row[34].toString() : null;
            tempSS.FechaInicioVctNovedades = row[35] ? new Date(row[35]) : null;
            tempSS.FechaFinVctNovedades = row[36] ? new Date(row[36]) : null;
            tempSS.IrlNovedades = row[37] ? row[37].toString() : null;
            tempSS.FechaInicioIrlNovedades = row[38] ? new Date(row[38]) : null;
            tempSS.FechaFinIrlNovedades = row[39] ? new Date(row[39]) : null;
            tempSS.VipNovedades = row[40] ? row[40].toString() : null;
            tempSS.ValorSalario = row[41] ? row[41].toString() : null;
            tempSS.IntegralSalario = row[42] ? row[42].toString() : null;
            tempSS.TipoSalario = row[43] ? row[43].toString() : null;
            tempSS.AdministradoraPension = row[44] ? row[44].toString() : null;
            tempSS.DiasPension = row[45] ? row[45].toString() : null;
            tempSS.IBCPension = row[46] ? row[46].toString() : null;
            tempSS.TarifaPension = row[47] ? row[47].toString() : null;
            tempSS.TarifaAltoRiesgoPension = row[48] ? row[48].toString() : null;
            tempSS.ValorCotizacionPension = row[49] ? row[49].toString() : null;
            tempSS.CotizacionVoluntariaEmpleadorPension = row[50] ? row[50].toString() : null;
            tempSS.CotizacionVoluntariaAfiliadoPension = row[51] ? row[51].toString() : null;
            tempSS.FondoSolidaridadPensional = row[52] ? row[52].toString() : null;
            tempSS.FondoSubsistenciaPension = row[53] ? row[53].toString() : null;
            tempSS.ValorNoRetenidoPension = row[54] ? row[54].toString() : null;
            tempSS.TotalPension = row[55] ? row[55].toString() : null;
            tempSS.AFPDestinoPension = row[56] ? row[56].toString() : null;
            tempSS.AdministradoraSalud = row[57] ? row[57].toString() : null;
            tempSS.DiasSalud = row[58] ? row[58].toString() : null;
            tempSS.IBCSalud = row[59] ? row[59].toString() : null;
            tempSS.TarifaSalud = row[60] ? row[60].toString() : null;
            tempSS.ValorCotizacionSalud = row[61] ? row[61].toString() : null;
            tempSS.ValorUPCSalud = row[62] ? row[62].toString() : null;
            tempSS.TotalSalud = row[63] ? row[63].toString() : null;
            tempSS.EPSDestinoSalud = row[64] ? row[64].toString() : null;
            tempSS.AdministradoraCCF = row[65] ? row[65].toString() : null;
            tempSS.DiasCCF = row[66] ? row[66].toString() : null;
            tempSS.IBCCCF = row[67] ? row[67].toString() : null;
            tempSS.TarifaCCF = row[68] ? row[68].toString() : null;
            tempSS.ValorCotizacionCCF = row[69] ? row[69].toString() : null;
            tempSS.AdministradoraRiesgos = row[70] ? row[70].toString() : null;
            tempSS.DiasRiesgos = row[71] ? row[71].toString() : null;
            tempSS.IBCRiesgos = row[72] ? row[72].toString() : null;
            tempSS.TarifaRiesgos = row[73] ? row[73].toString() : null;
            tempSS.ClaseRiesgoRiesgos = row[74] ? row[74].toString() : null;
            tempSS.ValorCotizacionRiesgos = row[75] ? row[75].toString() : null;
            tempSS.DiasParafiscales = row[76] ? row[76].toString() : null;
            tempSS.IBCParafiscales = row[77] ? row[77].toString() : null;
            tempSS.TarifaSENAParafiscales = row[78] ? row[78].toString() : null;
            tempSS.ValorCotizacionSENAParafiscales = row[79] ? row[79].toString() : null;
            tempSS.TarifaICBFParafiscales = row[80] ? row[80].toString() : null;
            tempSS.ValorCotizacionICBFParafiscales = row[81] ? row[81].toString() : null;
            tempSS.TarifaESAPParafiscales = row[82] ? row[82].toString() : null;
            tempSS.ValorCotizacionESAPParafiscales = row[83] ? row[8].toString() : null;
            tempSS.TarifaMENParafiscales = row[84] ? row[84].toString() : null;
            tempSS.ValorCotizacionMENParafiscales = row[85] ? row[85].toString() : null;
            tempSS.ExoneradoSENAeICBFParafiscales = row[86] ? row[86].toString() : null;

            return tempSS;
        });

        // console.log(data);

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

            console.log('Datos de archivo SS_MHS.xlsx guardados exitosamente en la base de datos.');
            return data;

        } catch (error) {
            await entityManager.transaction(async entityManager => {
                await entityManager.query(`TRUNCATE TABLE ${this.tempAccumulatedRepo.metadata.tableName};`);
            })
            console.error('Error al guardar los datos en la base de datos:', error);
            throw new Error('Error al guardar datos en la base de datos desde el archivo SS_MHS.xlsx: ' + error);

        } 
    }
}


