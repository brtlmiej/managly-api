import { EntityRepository, Repository } from 'typeorm';
import { Worker } from './worker.entity';
import { BaseRepository } from '../../common/database/base-repository';
import { WorkerTypeEnum } from '../workers-types/enums/worker-type.enum';

@EntityRepository(Worker)
export class WorkersRepository extends BaseRepository<Worker> {
  async findOneWaiter(id: number) {
    return await this.createQueryBuilder('a')
      .innerJoin('a.type', 'type')
      .where('a.id = :id', { id: id })
      .andWhere('a.deletedAt IS NULL')
      .andWhere('type.type = :type', { type: WorkerTypeEnum.WAITER })
      .getOne()
  }
}