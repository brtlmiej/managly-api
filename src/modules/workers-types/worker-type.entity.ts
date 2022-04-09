import { BaseEntity } from '../../common/database/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Worker } from '../workers/worker.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class WorkerType extends BaseEntity {
  @ApiProperty()
  @Column()
  type: string;

  @OneToMany(() => Worker, (obj) => obj.type)
  workers: Promise<Worker[]>
}