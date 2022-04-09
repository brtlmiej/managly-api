import { BaseRepository } from '../../common/database/base-repository';
import { WorkerType } from './worker-type.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(WorkerType)
export class WorkersTypesRepository extends BaseRepository<WorkerType>{}