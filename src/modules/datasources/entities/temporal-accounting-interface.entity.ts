// accounting-interface.entity.ts
/* eslint-disable prettier/prettier */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('temporal_accounting_interface') // Nombre de la tabla en la base de datos
export class AccountingInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'EncabEmpresa', nullable: true })
  EncabEmpresa: string;

  @Column({ name: 'EncabTipoDocumento', nullable: true })
  EncabTipoDocumento: string;

  @Column({ name: 'EncabDocumentoNumero', nullable: true })
  EncabDocumentoNumero: string;

  @Column({ name: 'EncabFecha', type: 'date', nullable: true })
  EncabFecha: Date;

  @Column({ name: 'EncabTerceroInterno', nullable: true })
  EncabTerceroInterno: string;

  @Column({ name: 'EncabTerceroExterno', nullable: true })
  EncabTerceroExterno: string;

  @Column({ name: 'EncabNota', nullable: true })
  EncabNota: string;

  @Column({ name: 'DetalleConIdCuentaContable', nullable: true })
  DetalleConIdCuentaContable: string;

  @Column({ name: 'DetalleConNota', nullable: true })
  DetalleConNota: string;

  @Column({ name: 'CedulaEmpleado', nullable: true })
  CedulaEmpleado: string;

  @Column({ name: 'Nombre', nullable: true })
  Nombre: string;

  @Column({ name: 'Tercero', nullable: true })
  Tercero: string;

  @Column({ name: 'DetalleConTerceroExterno', nullable: true })
  DetalleConTerceroExterno: string;

  @Column({ name: 'DetalleConCheque', nullable: true })
  DetalleConCheque: string;

  @Column({ name: 'DetalleConDebito', nullable: true })
  DetalleConDebito: string;

  @Column({ name: 'DetalleConCredito', nullable: true })
  DetalleConCredito: string;

  @Column({ name: 'DetalleConVencimiento', nullable: true })
  DetalleConVencimiento: string;

  @Column({ name: 'DetalleConPorcentajeRetencion', nullable: true })
  DetalleConPorcentajeRetencion: string;

  @Column({ name: 'DetalleConBaseRetencion', nullable: true })
  DetalleConBaseRetencion: string;

  @Column({ name: 'DetalleConPagoRetencion', nullable: true })
  DetalleConPagoRetencion: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
