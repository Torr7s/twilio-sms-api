import { Reflector } from '@nestjs/core';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../decorators/public-key.decorator';

import { UnauthorizedError } from '../errors/unauthorized.error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { 
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), 
      context.getClass()
    ])

    if (isPublic) return true

    const canActivate = super.canActivate(context)

    if (typeof canActivate === 'boolean') return canActivate

    const canActivatePromise = canActivate as Promise<boolean>

    return canActivatePromise.catch((err) => {
      if (err instanceof UnauthorizedError) {
        throw new UnauthorizedError(err.message)
      }

      throw new UnauthorizedException()
    })
  }
}