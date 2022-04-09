import { IsPassportNumber, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WorkerDto {
  @ApiProperty({ required: true, minimum: 2, maximum: 100 })
  @Length(2, 100)
  firstName: string;

  @ApiProperty({ required: true, minimum: 2, maximum: 100 })
  @Length(2, 100)
  lastName: string;

  @ApiProperty({ required: true, description: 'Field must be valid PL phone number' })
  @IsPhoneNumber('PL')
  phoneNumber: string;

  typeId: number;
}