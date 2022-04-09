import { EntityRepository, Repository } from 'typeorm';
import { Worker } from './worker.entity';
import { BaseRepository } from '../../common/database/base-repository';

@EntityRepository(Worker)
export class WorkersRepository extends BaseRepository<Worker> {}