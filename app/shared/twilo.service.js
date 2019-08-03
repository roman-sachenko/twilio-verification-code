const Twilio = require('twilio');
const ConfigService = require('./config.service');

module.exports = class TwilioService {
  constructor(client = new Twilio(ConfigService.getValue('twilioAccountSid'), ConfigService.getValue('twilioAuthToken'))) {
    this._client = client;
  }

  async sendSms({ body, to, from }) {
    await this._client.messages.create({ body, to, from });
    return true;
  }
};
