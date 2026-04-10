import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("vehicles")
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  placa!: string;

  @Column({ unique: true })
  chassi!: string;

  @Column({ unique: true })
  renavam!: string;

  @Column()
  modelo!: string;

  @Column()
  marca!: string;

  @Column()
  ano!: number;
}
