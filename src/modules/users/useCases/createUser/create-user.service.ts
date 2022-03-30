import { BadRequestException, Injectable } from '@nestjs/common';

import { UserEntity } from '@modules/users/infra/typeorm/entities/user.entity';
import { UsersRepository } from '@modules/users/infra/repositories/users.repository';

import { TwilioProvider } from 'infra/twilio/twilio.provider';
import { AuthProvider } from '@shared/container/providers/auth/auth.provider';

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
  phone_number: string;
}
@Injectable()
export class CreateUserService {
  constructor(
    private readonly _repository: UsersRepository,

    private readonly _authProvider: AuthProvider,
    private readonly _twilioProvider: TwilioProvider
  ) { }

  async perform({
    name,
    email,
    password,
    phone_number
  }: ICreateUserRequest): Promise<UserEntity> {
    const userRecordByEmail = await this._repository.findByEmail(email)

    if (userRecordByEmail) throw new BadRequestException('User already exists!')

    const userRecordByPhoneNumber = await this._repository.findByPhoneNumber(phone_number)

    if (userRecordByPhoneNumber) throw new BadRequestException('User already exists!')

    const hashedPassword = await this._authProvider.hashPassword(password, 9)

    const newUserRecord = await this._repository.create({
      name,
      email,
      password: hashedPassword,
      phone_number
    })

    await this._twilioProvider.startPhoneNumberVerification(phone_number)

    return newUserRecord
  }
}