import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { AuthProvider } from '../auth.provider';

import { UserEntity } from '@modules/users/infra/typeorm/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authProvider: AuthProvider) {
    super({ 
      usernameField: 'email' 
    })
  }

  validate(email: string, password: string): Promise<UserEntity> {
    return this._authProvider.validateUser(email, password)
  }
}