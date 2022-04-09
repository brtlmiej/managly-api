import { Controller, Get } from '@nestjs/common';
import { WorkersTypesRepository } from './workers-types.repository';
import { ApiResponse } from '@nestjs/swagger';
import { WorkerType } from './worker-type.entity';

@Controller('/api/workers-types')
export class WorkersTypesController {
  constructor(
    private readonly workersTypesRepository: WorkersTypesRepository
  ) {}

  @Get()
  @ApiResponse({ type: [WorkerType], description: 'Get all worker types' })
  async findAll() {
    return await this.workersTypesRepository.find();
  }
}
