import { compare, hash } from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '@modules/users/infra/typeorm/entities/user.entity';
import { UsersRepository } from '@modules/users/infra/repositories/users.repository';

import { IPayload, IAuthProvider } from './domain/repositories/auth.interface';

import { UnauthorizedError } from './errors/unauthorized.error';

@Injectable()
export class AuthProvider implements IAuthProvider {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _repository: UsersRepository
  ) { }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    const result = await compare(password, hashedPassword)

    return result
  }

  async hashPassword(password: string, salt: number = 9): Promise<string> {
    const hashedPassword = await hash(password, salt)

    return hashedPassword
  }

  signToken(sub: string): string {
    const authToken = this._jwtService.sign({ sub })

    return authToken
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const userRecord: UserEntity = await this._repository.findByEmail(email)

    if (userRecord) {
      const validPassword = await this.comparePasswords(password, userRecord.password)

      if (validPassword) {
        return { 
          ...userRecord, 
          password: undefined 
        }
      }
    }

    throw new UnauthorizedError('Invalid credentials!')
  }

  verifyToken(token: string): IPayload {
    const authToken = this._jwtService.verify(token)

    return authToken as IPayload
  }
}