import { Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TableDto {
  @Min(1)
  @Max(100)
  @ApiProperty({ minimum: 1, maximum: 100 })
  number: number;

  @ApiProperty()
  waiterId?: number;
}