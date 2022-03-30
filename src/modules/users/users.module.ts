import { Module } from '@nestjs/common';

import { AuthUserModule } from '@modules/auth/auth.module';

import { AuthProvider } from '@shared/container/providers/auth/auth.provider';

import { CreateUserController } from '@modules/users/useCases/createUser/create-user.controller';
import { CreateUserService } from '@modules/users/useCases/createUser/create-user.service';
import { UsersRepository } from '@modules/users/infra/repositories/users.repository';

import { TwilioProviderModule } from 'infra/twilio/twilio.module';
import { AuthProviderModule } from '@shared/container/providers/auth/auth.module';
@Module({
  imports: [AuthUserModule, AuthProviderModule, TwilioProviderModule],
  controllers: [CreateUserController],
  providers: [AuthProvider, CreateUserService, UsersRepository],
  exports: [UsersRepository]
})

export class UsersModule { }