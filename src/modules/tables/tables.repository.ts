import { BaseRepository } from '../../common/database/base-repository';
import { Table } from './table.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Table)
export class TablesRepository extends BaseRepository<Table> {}