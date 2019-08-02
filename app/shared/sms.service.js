const TwilioService = require('./twilo.service');
const ConfigService = require('./config.service');

module.exports = class SmsService {
  constructor(twilioService = new TwilioService(), fromNumber = ConfigService.getValue('smsFromNumber')) {
    this._provider = twilioService;
    this._fromNumber = fromNumber;
  }

  send({ body, to }) {
    const smsParams = {
      body,
      to,
      from: this._fromNumber,
    };
    return this._provider.sendSms(smsParams);
  }
};
