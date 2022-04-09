import { Module } from '@nestjs/common';
import { WorkersTypesController } from './workers-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkersTypesRepository } from './workers-types.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkersTypesRepository])],
  controllers: [WorkersTypesController]
})
export class WorkersTypesModule {}
