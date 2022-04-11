import { BadRequestException, Injectable } from '@nestjs/common';
import { TableDto } from './dto/table.dto';
import { EntityManager } from 'typeorm';
import { Table } from './table.entity';
import { WorkersRepository } from '../workers/workers.repository';
import { TablesRepository } from './tables.repository';

@Injectable()
export class TablesService {
  constructor(
    protected readonly workersRepository: WorkersRepository,
    protected readonly tablesRepository: TablesRepository,
  ) {
  }

  async create(em: EntityManager, data: TableDto) {
    const table = new Table();
    return await this.update(em, table, data);
  }

  async update(em: EntityManager, table: Table, data: TableDto) {
    let waiter = null;
    if (data.waiterId) {
      waiter = await this.workersRepository.findOneWaiter(data.waiterId);
      if (!waiter) {
        throw new BadRequestException('Selected waiter does not exist');
      }
    }
    const exist = await this.tablesRepository.findOne({
      where: {
        number: data.number,
        deletedAt: null
      }
    });
    if (exist) {
      throw new BadRequestException('Table with given number already exist');
    }
    table.waiter = waiter;
    table.number = data.number;
    return await em.save(table);
  }

  async remove(em: EntityManager, table: Table) {
    table.deletedAt = new Date();
    await em.save(table);
  }
}
