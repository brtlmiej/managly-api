import { Module } from '@nestjs/common';
import { WorkersController } from './workers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkersRepository } from './workers.repository';
import { WorkersTypesRepository } from '../workers-types/workers-types.repository';
import { WorkersService } from './workers.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    WorkersRepository,
    WorkersTypesRepository
  ])],
  controllers: [WorkersController],
  providers: [WorkersService],
})
export class WorkersModule {}
