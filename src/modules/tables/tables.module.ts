import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TablesRepository } from './tables.repository';
import { WorkersRepository } from '../workers/workers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    TablesRepository,
    WorkersRepository
  ])],
  providers: [TablesService],
  controllers: [TablesController]
})
export class TablesModule {}
