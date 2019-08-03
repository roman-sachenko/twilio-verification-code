const userTestData = require('../../helpers/testData/user.testData');
const SmsService = require('../../../../app/shared/sms.service');
const UserService = require('../../../../app/user/user.service');
const UserNotificationService = require('../../../../app/userVerification/userVerification.service');
const userServiceMock = require('../../mocks/userService.mock');
const smsServiceMock = require('../../mocks/smsService.mock');

jest.mock('../../../../app/shared/sms.service');
jest.mock('../../../../app/user/user.service');

describe('# User Verification Service: Send Code', () => {
  beforeAll(() => {
    SmsService.mockImplementation(() => smsServiceMock);
    UserService.mockImplementation(() => userServiceMock);
  });

  it('# Should return return TRUE with provided user ID', async () => {
    const userNotificationService = new UserNotificationService();
    const result = await userNotificationService.sendCode(userTestData.USER_ID_VALID);
    expect(result).toBe(true);
  });

  it('# Should throw an error with invalid user ID', async () => {
    const userNotificationService = new UserNotificationService();
    await expect(userNotificationService.sendCode(userTestData.USER_ID_INVALID)).rejects.toThrow('ERR_USER_INVALID');
  });


  it('# Should throw an error with empty user ID', async () => {
    const userNotificationService = new UserNotificationService();
    await expect(userNotificationService.sendCode()).rejects.toThrow('ERR_USER_ID_NOT_PROVIDED');
  });
});
