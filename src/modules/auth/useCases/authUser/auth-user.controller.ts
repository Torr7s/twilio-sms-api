import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthUserDto } from '@modules/auth/domain/dtos/auth-user.dto';

import { AuthUserService } from './auth-user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('/api/login')
export class AuthUserController {
  constructor(private readonly _authUserService: AuthUserService) { }

  @ApiOperation({ description: 'Authenticate yourself to get access to other features' })

  @ApiBody({ type: AuthUserDto })

  @ApiResponse({ status: 200, description: 'Authentication performed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials provided' })

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