import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthUserDto } from '@modules/auth/domain/dtos/auth-user.dto';

import { AuthUserService } from './auth-user.service';

@Controller('/api/login')
export class AuthUserController {
  constructor(private readonly _authUserService: AuthUserService) { }

  @Post()
  async handle(
    @Body() data: AuthUserDto, 
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {
    const token = await this._authUserService.perform(data)

    return response.json(token)
  }
}