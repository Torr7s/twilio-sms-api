import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersRepository } from '@modules/users/infra/repositories/users.repository';

import { AuthProvider } from './auth.provider';

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