import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseEntity } from '../../common/database/base.entity';
import { Worker } from '../workers/worker.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Table extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'integer' })
  number: number;

  @Exclude()
  @ManyToOne(() => Worker, (obj) => obj.tables)
  waiter: Worker;

  @ApiProperty()
  @RelationId('waiter')
  waiterId: number;
}