import { Injectable } from '@nestjs/common';

import { Twilio } from 'twilio';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';

import { ITwilioProvider } from './repositories/twilio.interface';

@Injectable()
export class TwilioProvider implements ITwilioProvider {
  private _twilioClient: Twilio
  private _serviceSid: string

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN

    this._serviceSid = process.env.TWILIO_VERIFICATION_SERVICE_SID

    this._twilioClient = new Twilio(accountSid, authToken)
  }

  async startPhoneNumberVerification(phone_number: string): Promise<VerificationInstance> {
    return this._twilioClient
      .verify
      .services(this._serviceSid)
      .verifications
      .create({
        to: phone_number,
        channel: 'sms',
        locale: 'pt'
      })
  }

  async completePhoneNumberConfirmation(phone_number: string, code: string): Promise<VerificationCheckInstance> {
    const result = await this._twilioClient
      .verify
      .services(this._serviceSid)
      .verificationChecks
      .create({
        to: phone_number,
        code: code
      })

    return result
  }
}