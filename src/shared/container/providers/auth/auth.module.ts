import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersRepository } from '@modules/users/infra/repositories/users.repository';

import { AuthProvider } from '@shared/container/providers/auth/auth.provider';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.MD5_HASH,
      signOptions: {
        expiresIn: '12h'
      }
    })
  ],
  providers: [
    AuthProvider,
    LocalStrategy,
    JwtStrategy,
    UsersRepository,
  ],
  exports: [AuthProvider, JwtModule]
})

export class AuthProviderModule { }