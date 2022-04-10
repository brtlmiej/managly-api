import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { WorkersRepository } from './workers.repository';
import { WorkerDto } from './dto/worker.dto';
import { WorkersService } from './workers.service';
import { getConnection } from 'typeorm';
import { ApiResponse } from '@nestjs/swagger';
import { Worker } from './worker.entity';

@Controller('/api/workers')
export class WorkersController {
  constructor(
    protected readonly workersRepository: WorkersRepository,
    protected readonly workersService: WorkersService,
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ type: [Worker], description: 'Get all workers' })
  async findAll() {
    return await this.workersRepository.find(
      {
        order: {
          id: 'ASC'
        },
        where: { deletedAt: null },
      });
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ type: Worker, description: 'Get one worker by id' })
  async findOne(@Param('id') id: number) {
    const worker = await this.workersRepository.findOne(id, {
      where: { deletedAt: null },
    });
    if (!worker) {
      throw new NotFoundException('Worker not found');
    }
    return worker;
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ type: Worker, description: 'Create worker' })
  async create(@Body() data: WorkerDto) {
    let worker;
    await getConnection().transaction(async (em) => {
      worker = await this.workersService.create(em, data);
    });
    return worker;
  }

  @Post(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @ApiResponse({ type: Worker, description: 'Update worker' })
  async update(
    @Param('id') id: number,
    @Body() data: WorkerDto
  ) {
    const worker = await this.workersRepository.findOne(id, {
      where: { deletedAt: null }
    });
    if (!worker) {
      throw new NotFoundException('Worker not found');
    }
    await getConnection().transaction(async (em) => {
      await this.workersService.update(em, worker, data);
    });
    return worker;
  }

  @Post(':id/delete')
  @HttpCode(200)
  @ApiResponse({ description: 'Remove worker' })
  async remove(
    @Param('id') id: number,
  ) {
    const worker = await this.workersRepository.findOne(id, {
      where: { deletedAt: null }
    });
    if (!worker) {
      throw new NotFoundException('Worker not found');
    }
    await getConnection().transaction(async (em) => {
      await this.workersService.remove(em, worker);
    });
    return;
  }
}
