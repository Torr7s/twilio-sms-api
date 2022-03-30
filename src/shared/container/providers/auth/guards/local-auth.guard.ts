import { Observable } from 'rxjs';

import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context)
  }

  handleRequest(error, user) {
    if (error || !user) throw new UnauthorizedException(error?.message)

    return user
  }
}