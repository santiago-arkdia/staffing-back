/* eslint-disable prettier/prettier */

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('temporal_accumulated_extract')
export class TemporalAccumulatedExtract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 128 })
  IdentificacionCliente: string;

  @Column({ nullable: true, length: 1024 })
  NombreCliente: string;

  @Column({ nullable: true, length: 128 })
  Agencia: string;

  @Column({ nullable: true, length: 128 })
  IdCentroCosto: string;

  @Column({ nullable: true, length: 128 })
  NombreCentroCosto: string;

  @Column({ nullable: true, length: 128 })
  EstadoVinculacion: string;

  @Column({ nullable: true, length: 256 })
  TipoContrato: string;

  @Column({ nullable: true, length: 256 })
  NoContrato: string;

  @Column({ nullable: true, length: 256 })
  IdentificacionColaborador: string;

  @Column({ nullable: true, length: 1024 })
  NombreColaborador: string;

  @Column({ nullable: true, length: 256 })
  Cargo: string;

  @Column({ nullable: true, length: 128 })
  Jornada: string;

  @Column({ nullable: true, length: 256 })
  Basico: string;

  @Column({ nullable: true, length: 256 })
  TipoSalario: string;

  @Column({ nullable: true })
  FechaInicio: Date;

  @Column({ nullable: true })
  FechaFin: Date;

  @Column({ nullable: true, length: 128 })
  NoNomina: string;

  @Column({ nullable: true })
  Ano: number;

  @Column({ nullable: true, length: 2 })
  Mes: string;

  @Column({ nullable: true, length: 128 })
  PeriodoNominal: string;

  @Column({ nullable: true, length: 32 })
  CodConcepto: string;

  @Column({ nullable: true, length: 256 })
  NombreConcepto: string;

  @Column({ nullable: true, length: 256 })
  ClaseConc: string;

  @Column({ nullable: true, length: 256 })
  MedidaConcepto: string;

  @Column({ nullable: true, length: 256 })
  SubConcepto: string;

  @Column({ nullable: true, length: 128 })
  Ajuste: string;

  @Column({ nullable: true, length: 128 })
  CantidadUnidades: string;

  @Column({ nullable: true, length: 128 })
  Valor: string;

  @Column({ nullable: true, length: 128 })
  Liquidacion: string;

  @Column({ nullable: true, length: 128 })
  NoDocumentoIncapacidad: string;

  @Column({ nullable: true })
  FechaInicioIncapacidad: Date;

  @Column({ nullable: true })
  FechaFinIncapacidad: Date;

  @Column({ nullable: true, length: 128 })
  NoCuenta: string;

  @Column({ nullable: true, length: 256 })
  Banco: string;

  @Column({ nullable: true, length: 128 })
  Facturable: string;

  @Column({ nullable: true, length: 128 })
  BaseParaImpuestos: string;

  @Column({ nullable: true, length: 16 })
  CodigoCCNovedad: string;

  @Column({ nullable: true, length: 128 })
  NombreCCNovedad: string;

  @Column({ nullable: true, length: 128 })
  Aiu: string;

  @Column({ nullable: true, length: 128 })
  NoFactura: string;

  @Column({ nullable: true })
  FechaEmision: Date;

  @Column({ nullable: true, length: 128 })
  LoteGerencia: string;

  @Column({ nullable: true })
  FechaDePago: Date;

  @Column({ nullable: true, length: 256 })
  Grupo: string;

  @Column({ nullable: true, length: 256 })
  PerPermanencia: string;

  @Column({ nullable: true, length: 256 })
  PagDocNumero: string;

  @Column({ nullable: true, length: 512 })
  HomologacionNE: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
