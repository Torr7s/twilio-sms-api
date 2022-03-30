import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { TwilioProviderModule } from '@infra/twilio/twilio.module';

import { AuthUserController } from './useCases/authUser/auth-user.controller';
import { ConfirmNumberController } from './useCases/confirmNumber/confirm-number.controller';

import { AuthUserService } from './useCases/authUser/auth-user.service';
import { ConfirmNumberService } from './useCases/confirmNumber/confirm-number.service';

import { UsersRepository } from '@modules/users/infra/repositories/users.repository';

import { AuthProvider } from '@shared/container/providers/auth/auth.provider';
import { AuthProviderModule } from '@shared/container/providers/auth/auth.module';

import { AuthValidationMiddleware } from '@shared/infra/http/middlewares/auth.middleware';

@Module({
  imports: [AuthProviderModule, TwilioProviderModule],
  controllers: [AuthUserController, ConfirmNumberController],
  providers: [
    AuthProvider, 
    AuthUserService,
    ConfirmNumberService, 
    UsersRepository
  ]
})

export class AuthUserModule implements NestModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthValidationMiddleware)
      .forRoutes(
        { path: '/api/users/confirm', method: RequestMethod.POST }
      )
  }
}