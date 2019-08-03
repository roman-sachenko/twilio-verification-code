const userTestData = require('../../helpers/testData/user.testData');
const UserService = require('../../../../app/user/user.service');
const SmsService = require('../../../../app/shared/sms.service');
const UserNotificationService = require('../../../../app/userVerification/userVerification.service');
const userServiceMock = require('../../mocks/userService.mock');
const smsServiceMock = require('../../mocks/smsService.mock');

jest.mock('../../../../app/shared/sms.service');
jest.mock('../../../../app/user/user.service');

describe('# User Verification Service: Verify Code', () => {
  beforeAll(() => {
    SmsService.mockImplementation(() => smsServiceMock);
    UserService.mockImplementation(() => userServiceMock);
  });

  it('# Should return return TRUE with provided user ID and valid code', async () => {
    const userNotificationService = new UserNotificationService();
    const result = await userNotificationService
      .verifyCode(userTestData.USER_ID_VALID, userTestData.VERIFICATION_CODE_VALID);
    expect(result).toBe(true);
  });

  it('# Should return FALSE with invalid verification code', async () => {
    const userNotificationService = new UserNotificationService();
    const result = await userNotificationService
      .verifyCode(userTestData.USER_ID_VALID, userTestData.VERIFICATION_CODE_INVALID);
    expect(result).toBe(false);
  });

  it('# Should throw an error with invalid user ID', async () => {
    const userNotificationService = new UserNotificationService();
    await expect(userNotificationService
      .verifyCode(userTestData.USER_ID_INVALID, userTestData.VERIFICATION_CODE_VALID))
      .rejects.toThrow('ERR_USER_INVALID');
  });

  it('# Should throw an error with empty user ID', async () => {
    const userNotificationService = new UserNotificationService();
    await expect(userNotificationService.verifyCode()).rejects.toThrow('ERR_USER_ID_NOT_PROVIDED');
  });

  it('# Should throw an error with empty verification Code', async () => {
    const userNotificationService = new UserNotificationService();
    await expect(userNotificationService.verifyCode(userTestData.USER_ID_VALID))
      .rejects.toThrow('ERR_VERIFICATION_CODE_NOT_PROVIDED');
  });
});
