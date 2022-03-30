import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';

export interface ITwilioProvider {
  startPhoneNumberVerification(phone_number: string): Promise<VerificationInstance>;
  completePhoneNumberConfirmation(phone_number: string, code: string): Promise<VerificationCheckInstance>;
}