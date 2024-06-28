/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('temporal_ss')
export class TemporalSS {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'varchar', length: 32 })
    TipoId: string;

    @Column({ type: 'text' })
    NoId: string;

    @Column({ type: 'varchar', length: 128, name: 'NombreEmpleado' })
    NombreEmpleado: string;

    @Column({ type: 'text', name: 'TipoCotizante' })
    TipoCotizante: string;

    @Column({ type: 'varchar', length: 32, name: 'HorasLaboradas' })
    HorasLaboradas: string;

    @Column({ type: 'varchar', length: 8 })
    Extranjero: string;

    @Column({ type: 'varchar', length: 8 })
    TempExt: string;

    @Column({ type: 'date', name: 'FechaRadicacionEnElExterior' })
    FechaRadicacionEnElExterior: Date;

    @Column({ type: 'varchar', length: 32, name: 'IngNovedades' })
    IngNovedades: string;

    @Column({ type: 'date', name: 'FechaIngNovedades' })
    FechaIngNovedades: Date;

    @Column({ type: 'varchar', length: 32, name: 'RetNovedades' })
    RetNovedades: string;

    @Column({ type: 'date', name: 'FechaRetNovedades' })
    FechaRetNovedades: Date;

    @Column({ type: 'varchar', length: 32, name: 'TdeNovedades' })
    TdeNovedades: string;

    @Column({ type: 'date', name: 'TaeNovedades' })
    TaeNovedades: Date;

    @Column({ type: 'varchar', length: 32, name: 'TdpNovedades' })
    TdpNovedades: string;

    @Column({ type: 'varchar', length: 32, name: 'TapNovedades' })
    TapNovedades: string;

    @Column({ type: 'varchar', length: 32, name: 'VspNovedades' })
    VspNovedades: string;

    @Column({ type: 'date', name: 'FechaInicioVspNovedades' })
    FechaInicioVspNovedades: Date;

    @Column({ type: 'varchar', length: 32, name: 'CorNovedades' })
    CorNovedades: string;

    @Column({ type: 'varchar', length: 32, name: 'VstNovedades' })
    VstNovedades: string;

    @Column({ type: 'varchar', length: 32, name: 'SlnNovedades' })
    SlnNovedades: string;

    @Column({ type: 'date', name: 'FechaInicioSlnNovedades' })
    FechaInicioSlnNovedades: Date;

    @Column({ type: 'date', name: 'FechaFinSlnNovedades' })
    FechaFinSlnNovedades: Date;

    @Column({ type: 'varchar', length: 32, name: 'IgeNovedades' })
    IgeNovedades: string;

    @Column({ type: 'date', name: 'FechaInicioIgeNovedades' })
    FechaInicioIgeNovedades: Date;

    @Column({ type: 'date', name: 'FechaFinIgeNovedades' })
    FechaFinIgeNovedades: Date;

    @Column({ type: 'varchar', length: 32, name: 'LmaNovedades' })
    LmaNovedades: string;

    @Column({ type: 'date', name: 'FechaInicioLmaNovedades' })
    FechaInicioLmaNovedades: Date;

    @Column({ type: 'date', name: 'FechaFinLmaNovedades' })
    FechaFinLmaNovedades: Date;

    @Column({ type: 'varchar', length: 32, name: 'VacLrNovedades' })
    VacLrNovedades: string;

    @Column({ type: 'date', name: 'FechaInicioVacLrNovedades' })
    FechaInicioVacLrNovedades: Date;

    @Column({ type: 'date', name: 'FechaFinVacLrNovedades' })
    FechaFinVacLrNovedades: Date;

    @Column({ type: 'varchar', length: 32, name: 'AvpNovedades' })
    AvpNovedades: string;

    @Column({ type: 'varchar', length: 32, name: 'VctNovedades' })
    VctNovedades: string;

    @Column({ type: 'date', name: 'FechaInicioVctNovedades' })
    FechaInicioVctNovedades: Date;

    @Column({ type: 'date', name: 'FechaFinVctNovedades' })
    FechaFinVctNovedades: Date;

    @Column({ type: 'varchar', length: 32, name: 'IrlNovedades' })
    IrlNovedades: string;

    @Column({ type: 'date', name: 'FechaInicioIrlNovedades' })
    FechaInicioIrlNovedades: Date;

    @Column({ type: 'date', name: 'FechaFinIrlNovedades' })
    FechaFinIrlNovedades: Date;

    @Column({ type: 'varchar', length: 32, name: 'VipNovedades' })
    VipNovedades: string;

    @Column({ type: 'varchar', length: 256, name: 'ValorSalario' })
    ValorSalario: string;

    @Column({ type: 'varchar', length: 64, name: 'IntegralSalario' })
    IntegralSalario: string;

    @Column({ type: 'varchar', length: 64, name: 'TipoSalario' })
    TipoSalario: string;

    @Column({ type: 'varchar', length: 256, name: 'AdministradoraPension' })
    AdministradoraPension: string;

    @Column({ type: 'varchar', length: 32, name: 'DiasPension' })
    DiasPension: string;

    @Column({ type: 'text', name: 'IBCPension' })
    IBCPension: string;

    @Column({ type: 'varchar', length: 32, name: 'TarifaPension' })
    TarifaPension: string;

    @Column({ type: 'text', name: 'TarifaAltoRiesgoPension' })
    TarifaAltoRiesgoPension: string;

    @Column({ type: 'text', name: 'ValorCotizacionPension' })
    ValorCotizacionPension: string;

    @Column({ type: 'text', name: 'CotizacionVoluntariaEmpleadorPension' })
    CotizacionVoluntariaEmpleadorPension: string;

    @Column({ type: 'text', name: 'CotizacionVoluntariaAfiliadoPension' })
    CotizacionVoluntariaAfiliadoPension: string;

    @Column({ type: 'text', name: 'FondoSolidaridadPensional' })
    FondoSolidaridadPensional: string;

    @Column({ type: 'text', name: 'FondoSubsistenciaPension' })
    FondoSubsistenciaPension: string;

    @Column({ type: 'text', name: 'ValorNoRetenidoPension' })
    ValorNoRetenidoPension: string;

    @Column({ type: 'text', name: 'TotalPension' })
    TotalPension: string;

    @Column({ type: 'text', name: 'AFPDestinoPension' })
    AFPDestinoPension: string;

    @Column({ type: 'varchar', length: 256, name: 'AdministradoraSalud' })
    AdministradoraSalud: string;

    @Column({ type: 'varchar', length: 32, name: 'DiasSalud' })
    DiasSalud: string;

    @Column({ type: 'text', name: 'IBCSalud' })
    IBCSalud: string;

    @Column({ type: 'varchar', length: 32, name: 'TarifaSalud' })
    TarifaSalud: string;

    @Column({ type: 'text', name: 'ValorCotizacionSalud' })
    ValorCotizacionSalud: string;

    @Column({ type: 'text', name: 'ValorUPCSalud' })
    ValorUPCSalud: string;

    @Column({ type: 'text', name: 'TotalSalud' })
    TotalSalud: string;

    @Column({ type: 'text', name: 'EPSDestinoSalud' })
    EPSDestinoSalud: string;
    @Column({ type: 'varchar', length: 256, name: 'AdministradoraCCF' })
    AdministradoraCCF: string;

    @Column({ type: 'varchar', length: 32, name: 'DiasCCF' })
    DiasCCF: string;

    @Column({ type: 'text', name: 'IBCCCF' })
    IBCCCF: string;

    @Column({ type: 'varchar', length: 32, name: 'TarifaCCF' })
    TarifaCCF: string;

    @Column({ type: 'text', name: 'ValorCotizacionCCF' })
    ValorCotizacionCCF: string;

    @Column({ type: 'varchar', length: 256, name: 'AdministradoraRiesgos' })
    AdministradoraRiesgos: string;

    @Column({ type: 'varchar', length: 32, name: 'DiasRiesgos' })
    DiasRiesgos: string;

    @Column({ type: 'text', name: 'IBCRiesgos' })
    IBCRiesgos: string;

    @Column({ type: 'varchar', length: 32, name: 'TarifaRiesgos' })
    TarifaRiesgos: string;

    @Column({ type: 'varchar', length: 32, name: 'ClaseRiesgoRiesgos' })
    ClaseRiesgoRiesgos: string;

    @Column({ type: 'text', name: 'ValorCotizacionRiesgos' })
    ValorCotizacionRiesgos: string;

    @Column({ type: 'varchar', length: 32, name: 'DiasParafiscales' })
    DiasParafiscales: string;

    @Column({ type: 'text', name: 'IBCParafiscales' })
    IBCParafiscales: string;

    @Column({ type: 'varchar', length: 32, name: 'TarifaSENAParafiscales' })
    TarifaSENAParafiscales: string;

    @Column({ type: 'text', name: 'ValorCotizacionSENAParafiscales' })
    ValorCotizacionSENAParafiscales: string;

    @Column({ type: 'varchar', length: 32, name: 'TarifaICBFParafiscales' })
    TarifaICBFParafiscales: string;

    @Column({ type: 'text', name: 'ValorCotizacionICBFParafiscales' })
    ValorCotizacionICBFParafiscales: string;

    @Column({ type: 'varchar', length: 32, name: 'TarifaESAPParafiscales' })
    TarifaESAPParafiscales: string;

    @Column({ type: 'text', name: 'ValorCotizacionESAPParafiscales' })
    ValorCotizacionESAPParafiscales: string;

    @Column({ type: 'varchar', length: 32, name: 'TarifaMENParafiscales' })
    TarifaMENParafiscales: string;

    @Column({ type: 'text', name: 'ValorCotizacionMENParafiscales' })
    ValorCotizacionMENParafiscales: string;

    @Column({ type: 'text', name: 'ExoneradoSENAeICBFParafiscales' })
    ExoneradoSENAeICBFParafiscales: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updated_at: Date;

}
