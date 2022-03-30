import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto } from '@modules/users/dtos/create-user.dto';
import { UserEntity } from '@modules/users/infra/typeorm/entities/user.entity';

import { CreateUserService } from '@modules/users/useCases/createUser/create-user.service';
@Controller('/api/users/register')
export class CreateUserController {
  constructor(private readonly _createUserservice: CreateUserService) { }

  @Post()
  async handle(@Body() data: CreateUserDto, @Res() response: Response): Promise<Response> {
    const new_user_record: UserEntity = await this._createUserservice.perform(data)

    return response.json(new_user_record)
  }
}