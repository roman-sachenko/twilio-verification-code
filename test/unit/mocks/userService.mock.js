const userTestData = require('../helpers/testData/user.testData');

module.exports = {
  findById: (userId) => {
    return Promise.resolve(userTestData.UserDB[userId]);
  },

  setVerificationCode: () => {
    return Promise.resolve(true);
  },

  setVerifiedCodeInfo: () => {
    return Promise.resolve(true);
  },
};
