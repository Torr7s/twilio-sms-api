import { Injectable } from '@nestjs/common';

import { AuthProvider } from '@shared/container/providers/auth/auth.provider';

interface IAuthUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthUserService {
  constructor(private readonly _authProvider: AuthProvider) { }

  async perform({ email, password }: IAuthUserRequest): Promise<string> {
    const validUser = await this._authProvider.validateUser(email, password)

    const token = this._authProvider.signToken(validUser.id)

    return token
  }
}