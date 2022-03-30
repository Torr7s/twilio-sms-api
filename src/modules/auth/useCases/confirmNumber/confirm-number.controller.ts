import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { ConfirmNumberDto } from '@modules/auth/dtos/confirm-number.dto';

import { ConfirmNumberService } from './confirm-number.service';

@Controller('/api/users/confirm')
export class ConfirmNumberController {
  constructor(private readonly _confirmNumberService: ConfirmNumberService) { }

  @Post()
  async handle(
    @Body() data: ConfirmNumberDto,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {
    await this._confirmNumberService.perform(request.user_id, data)

    return response.sendStatus(200)
  }
}