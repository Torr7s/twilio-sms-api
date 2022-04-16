import { IsNotEmpty, IsString, Matches } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ConfirmNumberDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/)
  phone_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string
}