import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { WorkerDto } from './dto/worker.dto';
import { Worker } from './worker.entity';
import { WorkersTypesRepository } from '../workers-types/workers-types.repository';

@Injectable()
export class WorkersService {
  constructor(
    protected readonly workersTypesRepository: WorkersTypesRepository
  ) {}

  async create(em: EntityManager, data: WorkerDto) {
    const worker = new Worker();
    return await this.update(em, worker, data);
  }

  async update(em: EntityManager, worker: Worker, data: WorkerDto) {
    const type = await this.workersTypesRepository.findOne({ id: data.typeId });
    if (!type) {
      throw new BadRequestException('Selected worker type does not exist');
    }
    worker.type = type;
    worker.firstName = data.firstName;
    worker.lastName = data.lastName;
    worker.phoneNumber = data.phoneNumber;

    return await em.save(worker);
  }

  async remove(em: EntityManager, worker: Worker) {
    const tables = worker.tables;
    for (const table of tables) {
      table.waiter = null;
    }
    worker.deletedAt = new Date();
    await em.save(worker);
    await em.save(tables);
  }
}
