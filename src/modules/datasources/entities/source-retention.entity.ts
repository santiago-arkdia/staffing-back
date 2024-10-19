/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('source_retention') // Nombre de la tabla en la base de datos
export class SourceRetention {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32, nullable: true })
  IdentificacionColaborador: string | null; // Identificación del colaborador

  @Column({ type: 'varchar', length: 256, nullable: true })
  NombreColaborador: string | null; // Nombre del colaborador

  @Column({ type: 'varchar', length: 8, nullable: true })
  Mes: string | null; // Mes

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  BaseGravable: number | null; // Base gravable

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  Retencion: number | null; // Retención

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  CreatedAt: Date | null; // Timestamp de creación

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  UpdatedAt: Date | null; // Timestamp de última actualización
}
