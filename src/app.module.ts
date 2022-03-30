import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthUserModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';

import { TwilioProviderModule } from 'infra/twilio/twilio.module';
import { AuthProviderModule } from '@shared/container/providers/auth/auth.module';
@Module({
  imports: [
    AuthUserModule,
    TypeOrmModule.forRoot(),
    UsersModule,
  ],
  exports: []
})

export class AppModule { }
