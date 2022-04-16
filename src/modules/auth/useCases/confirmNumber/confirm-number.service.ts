import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';

import { TwilioProvider } from '@infra/twilio/twilio.provider';

import { UserEntity } from '@modules/users/infra/typeorm/entities/user.entity';
import { UsersRepository } from '@modules/users/infra/repositories/users.repository';

interface IConfirmNumberRequest {
  user_id: string;
  phone_number: string;
  code: string;
}

@Injectable()
export class ConfirmNumberService {
  constructor(
    private readonly _repository: UsersRepository,
    private readonly _twilioProvider: TwilioProvider
  ) { }

  async perform({ user_id, phone_number, code }: IConfirmNumberRequest): Promise<void> {
    const userRecord: UserEntity = await this._repository.findByPhoneNumber(phone_number)

    if (!userRecord) throw new UnauthorizedException('Invalid phone number!')

    const phoneNumberConfirmed = !!userRecord.phone_number_confirmed

    if (phoneNumberConfirmed) throw new UnauthorizedException('Phone number already confirmed!')

    const confirmationResult: VerificationCheckInstance = await this._twilioProvider.completePhoneNumberConfirmation(phone_number, code)

    if (
      !(confirmationResult.valid) ||
      !['approved'].includes(confirmationResult.status)
    ) {
      throw new BadRequestException('Invalid code provided to confirm phone number!')
    }

    await this._repository.confirmPhoneNumber(user_id)

    return
  }
}