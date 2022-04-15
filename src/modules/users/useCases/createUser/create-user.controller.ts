import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Request, Response } from 'express';

import { CreateUserDto } from '@modules/users/domain/dtos/create-user.dto';

import { UserEntity } from '@modules/users/infra/typeorm/entities/user.entity';

import { CreateUserService } from './create-user.service';

import { UserResponseDto } from '@modules/users/domain/dtos/user-response.dto';

@ApiTags('Users')
@Controller('/api/users/register')
export class CreateUserController {
  constructor(private readonly _createUserservice: CreateUserService) { }

  @ApiOperation({ description: 'Create an user with the appropriate properties' })

  @ApiBody({ type: CreateUserDto })

  @ApiResponse({ status: 200, description: 'The user has been successfully created', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'An user already exists with same email or phone number' })

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