
const TwilioService = require('../../../../app/shared/twilo.service');
const ConfigService = require('../../../../app/shared/config.service');
const SmsService = require('../../../../app/shared/sms.service');
const configServiceMock = require('../../mocks/configService.mock');
const twilioServiceMock = require('../../mocks/twilioService.mock');
const smsTestData = require('../../helpers/testData/smsTestData');


jest.mock('../../../../app/shared/twilo.service');
jest.mock('../../../../app/shared//config.service');

describe('# Sms Service: Send Message', () => {
  beforeAll(() => {
    TwilioService.mockImplementation(() => twilioServiceMock);
    ConfigService.getValue = jest.fn().mockImplementation(() => configServiceMock.getValue);
  });

  it('Should return TRUE with valid parameters', async () => {
    const smsService = new SmsService(new TwilioService(), ConfigService.getValue('smsFromNumber'));
    const result = await smsService.send({ body: smsTestData.SMS_BODY_VALID, to: smsTestData.TO_NUMBER_VALID });
    expect(result).toBe(true);
  });

  it('Should throw error with empty body', async () => {
    const smsService = new SmsService(new TwilioService(), ConfigService.getValue('smsFromNumber'));
    await expect(smsService.send({ body: '', to: smsTestData.TO_NUMBER_VALID })).rejects.toThrow('ERR_BODY_INVALID');
  });

  it('Should throw error with empty to number', async () => {
    const smsService = new SmsService(new TwilioService(), ConfigService.getValue('smsFromNumber'));
    await expect(smsService.send({ body: smsTestData.SMS_BODY_VALID, to: smsTestData.TO_NUMBER_INVALID }))
      .rejects.toThrow('ERR_TO_NUMBER_INVALID');
  });
});
