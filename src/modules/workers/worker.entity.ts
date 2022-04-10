import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from '../../common/database/base.entity';
import { WorkerType } from '../workers-types/worker-type.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class Worker extends BaseEntity {
  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column()
  phoneNumber: string;

  @Exclude()
  @ManyToOne(() => WorkerType, (obj) => obj.workers)
  type: WorkerType

  @ApiProperty()
  @RelationId('type')
  typeId: number;
}