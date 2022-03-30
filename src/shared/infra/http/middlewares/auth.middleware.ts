import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { AuthProvider } from '@shared/container/providers/auth/auth.provider';

@Injectable()
export class AuthValidationMiddleware implements NestMiddleware {
  constructor(private readonly _authProvider: AuthProvider) { }

  async use(request: Request, response: Response, next: NextFunction) {
    const headerToken = request.headers.authorization

    if (!headerToken) throw new UnauthorizedException('Invalid token!')

    const [, token] = headerToken.split(' ')

    try {
      const { sub } = this._authProvider.verifyToken(token)

      request.user_id = sub
      
      next()
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
} 