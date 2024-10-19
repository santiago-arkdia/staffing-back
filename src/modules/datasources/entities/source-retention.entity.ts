// accounting-interface.entity.ts
/* eslint-disable prettier/prettier */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('source_retention') // Nombre de la tabla en la base de datos
export class SourceRetention {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, unique: true, nullable: true })
  identificacionColaborador: string;  // Identificación del colaborador

  @Column({ type: 'varchar', length: 256, nullable: true })
  nombreColaborador: string;  // Nombre del colaborador

  @Column({ type: 'date', nullable: true })
  fechaInicio: Date;  // Fecha de inicio

  @Column({ type: 'varchar', length: 16, nullable: true })
  mes: string;  // Mes

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salario: number;  // Salario

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  auxilioTransporte: number;  // Auxilio de transporte

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  bonificacionExtraLegal: number;  // Bonificación extra legal

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  bonificacionPrestacional: number;  // Bonificación prestacional

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  licenciaRemunerada: number;  // Licencia remunerada

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  incapacidad: number;  // Incapacidad

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  horasExtras: number;  // Horas extras

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  vacaciones: number;  // Vacaciones

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalIngresosBrutos: number;  // Total ingresos brutos

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salud: number;  // Salud

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pension: number;  // Pensión

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  fss: number;  // FSS

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  fsp: number;  // FSP

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  baseGravable1: number;  // Base gravable 1

  @Column({ type: 'varchar', length: 16, nullable: true })
  dependientes: string;  // Dependientes

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  depuracion1: number;  // Depuración 1

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  medicinaPrepagada: number;  // Medicina prepagada

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  depuracion2: number;  // Depuración 2

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  intCreditoHipotecarioLeasing: number;  // Interés crédito hipotecario leasing

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  depuracion3: number;  // Depuración 3

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  baseGravable2: number;  // Base gravable 2

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  afc: number;  // AFC

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  avp: number;  // AVP

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  depuracion4: number;  // Depuración 4

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  baseRentaExenta: number;  // Base renta exenta

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  veinticincoPorcientoRentaExenta: number;  // 25% renta exenta

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  baseGravable3: number;  // Base gravable 3

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalDedExcento: number;  // Total deducible exento

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cuarentaPorcientoRentaLiqCed: number;  // 40% renta líquida cedida

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  acumVeinticincoPorciento: number;  // Acumulado 25%

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  acumCuarentaPorciento: number;  // Acumulado 40%

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  baseGravable4: number;  // Base gravable 4

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  uvts: number;  // UVTs

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  proc: number;  // PROC

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  retencion: number;  // Retención

  @Column({ type: 'varchar', length: 4198, nullable: true })
  comentarios: string;  // Comentarios

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;  // Timestamp de creación

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;  // Timestamp de última actualización
}
