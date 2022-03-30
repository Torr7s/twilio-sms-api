import { Module } from '@nestjs/common';

import { TwilioProviderModule } from '@infra/twilio/twilio.module';

import { AuthUserModule } from '@modules/auth/auth.module';

import { AuthProvider } from '@shared/container/providers/auth/auth.provider';
import { AuthProviderModule } from '@shared/container/providers/auth/auth.module';

import { CreateUserController } from './useCases/createUser/create-user.controller';

import { CreateUserService } from './useCases/createUser/create-user.service';

import { UsersRepository } from './infra/repositories/users.repository';

@Module({
  imports: [AuthUserModule, AuthProviderModule, TwilioProviderModule],
  controllers: [CreateUserController],
  providers: [AuthProvider, CreateUserService, UsersRepository],
  exports: [UsersRepository]
})

export class UsersModule { }