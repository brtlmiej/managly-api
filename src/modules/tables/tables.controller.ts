import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get, HttpCode,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TablesRepository } from './tables.repository';
import { TablesService } from './tables.service';
import { ApiResponse } from '@nestjs/swagger';
import { Table } from './table.entity';
import { TableDto } from './dto/table.dto';
import { getConnection } from 'typeorm';

@Controller('/api/tables')
export class TablesController {
  constructor(
    protected readonly tablesRepository: TablesRepository,
    protected readonly tablesService: TablesService,
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ type: [Table] })
  async findAll() {
    return await this.tablesRepository.find({
      where: { deletedAt: null },
      order: { number: 'ASC' }
    });
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ type: Table })
  async findOne(@Param('id') id: number) {
    const table = await this.tablesRepository.findOne(id, {
      where: { deletedAt: null }
    });
    if (!table) {
      throw new NotFoundException('Table not found');
    }
    return table;
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ type: Table })
  async create(@Body() data: TableDto) {
    let table;
    await getConnection().transaction(async (em) => {
      table = await this.tablesService.create(em, data);
    });
    return table;
  }

  @Post(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ type: Table })
  @HttpCode(200)
  async update(
    @Param('id') id: number,
    @Body() data: TableDto
  ) {
    const table = await this.tablesRepository.findOne(id, {
      where: { deletedAt: null }
    });
    if (!table) {
      throw new NotFoundException('Table not found');
    }
    await getConnection().transaction(async (em) => {
      await this.tablesService.update(em, table, data);
    });
    return table;
  }

  @Post(':id/delete')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  async remove(@Param('id') id: number) {
    const table = await this.tablesRepository.findOne(id, {
      where: { deletedAt: null }
    });
    if (!table) {
      throw new NotFoundException('Table not found');
    }
    await getConnection().transaction(async (em) => {
      await this.tablesService.remove(em, table);
    });
    return;
  }
}
