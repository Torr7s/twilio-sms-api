import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Request, Response } from 'express';

import { ConfirmNumberDto } from '@modules/auth/domain/dtos/confirm-number.dto';

import { ConfirmNumberService } from './confirm-number.service';

@ApiTags('Users')
@Controller('/api/users/confirm')
export class ConfirmNumberController {
  constructor(private readonly _confirmNumberService: ConfirmNumberService) { }

  @ApiOperation({ description: 'Confirm your phone number being authenticated with JSONWebToken.' })

  @ApiBody({ type: ConfirmNumberDto })

  @ApiResponse({ status: 200, description: 'The phone number has been successfully confirmed' })
  /* @ApiResponse({ status: 400, description: 'Invalid phone number' }) */
  @ApiResponse({ status: 400, description: 'Phone number already confirmed', })
  @ApiResponse({ status: 401, description: 'Invalid code provided to confirm phone number' })

  @Post()
  async handle(
    @Body() data: ConfirmNumberDto,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {
    const { user_id } = request

    const { phone_number, code } = data

    await this._confirmNumberService
      .perform({
        user_id,
        phone_number,
        code
      })

    return response.sendStatus(200)
  }
}