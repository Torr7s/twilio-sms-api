import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty({ default: false })
  phone_number_confirmed: boolean;

  @ApiProperty({ default: Date.now() })
  created_at: Date;

  @ApiProperty({ default: Date.now() })
  updated_at: Date;
}