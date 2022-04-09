import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from '../../common/database/base.entity';
import { WorkerType } from '../workers-types/worker-type.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ type: () => WorkerType })
  @ManyToOne(() => WorkerType, (obj) => obj.workers)
  type: WorkerType

  @RelationId('type')
  typeId: number;
}