import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ConfirmNumberDto {
  // @IsString()
  // @IsNotEmpty()
  // user_id

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/)
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  code: string
}