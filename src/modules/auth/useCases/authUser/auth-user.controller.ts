import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthUserService } from './auth-user.service';

import { AuthUserDto } from '@modules/auth/dtos/auth-user.dto';

@Controller('/api/login')
export class AuthUserController {
  constructor(private readonly _authUserService: AuthUserService) { }

  @Post()
  async handle(@Body() data: AuthUserDto, @Res() response: Response): Promise<Response> {
    const token = await this._authUserService.perform(data)

    return response.json(token)
  }
}