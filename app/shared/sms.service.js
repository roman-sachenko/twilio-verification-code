const TwilioService = require('./twilo.service');
const ConfigService = require('./config.service');

module.exports = class SmsService {
  constructor(twilioService = new TwilioService(), fromNumber = ConfigService.getValue('smsFromNumber')) {
    this._provider = twilioService;
    this._fromNumber = fromNumber;
  }

  _isPhoneNumberValid(phoneNumber) {
    return !!(phoneNumber && phoneNumber.length); // TODO: add strict validation (enough for demo)
  }

  _isBodyValid(body) {
    return !!(body && body.length);
  }

  async send({ body, to }) {
    if (!this._isBodyValid(body)) {
      throw new Error('ERR_BODY_INVALID');
    }

    if (!this._isPhoneNumberValid(to)) {
      throw new Error('ERR_TO_NUMBER_INVALID');
    }

    if (!this._isPhoneNumberValid(this._fromNumber)) {
      throw new Error('ERR_FROM_NUMBER_INVALID');
    }

    const smsParams = {
      body,
      to,
      from: this._fromNumber,
    };

    return this._provider.sendSms(smsParams);
  }
};
