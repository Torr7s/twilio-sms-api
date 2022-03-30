import { Module } from '@nestjs/common';

import { TwilioProvider } from './twilio.provider';

@Module({
  providers: [TwilioProvider],
  exports: [TwilioProvider]
})

export class TwilioProviderModule { }