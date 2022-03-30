import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserEntity } from '@modules/users/infra/typeorm/entities/user.entity';

import { AuthProvider } from '@shared/container/providers/auth/auth.provider';

interface IAuthUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthUserService {
  constructor(private readonly _authProvider: AuthProvider) { }

  async perform({ email, password }: IAuthUserRequest): Promise<string> {
    const validUser: UserEntity = await this._authProvider.validateUser(email, password)

    if (!validUser) throw new UnauthorizedException('Invalid credentials!')

    const token = this._authProvider.signToken(validUser.id)

    return token
  }
}