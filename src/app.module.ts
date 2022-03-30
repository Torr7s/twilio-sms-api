import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthUserModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [
    AuthUserModule,
    TypeOrmModule.forRoot(),
    UsersModule,
  ],
  exports: []
})

export class AppModule { }
