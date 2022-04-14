import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ConfirmNumberDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/)
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  code: string
}