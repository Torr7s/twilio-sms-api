import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { CreateUserDto } from '@modules/users/domain/dtos/create-user.dto';

import { UserEntity } from '@modules/users/infra/typeorm/entities/user.entity';

import { CreateUserService } from './create-user.service';

@Controller('/api/users/register')
export class CreateUserController {
  constructor(private readonly _createUserservice: CreateUserService) { }

  @Post()
  async handle(
    @Body() data: CreateUserDto, 
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {
    const new_user_record: UserEntity = await this._createUserservice.perform(data)

    return response.json(new_user_record)
  }
}