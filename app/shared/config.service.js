const config = {
  appPort: process.env.PORT || 3000,
  appEnv: process.env.NODE_ENV || 'development',
  appNumberOfInstances: process.env.NUMBER_OF_INSTANCES ? parseInt(process.env.NUMBER_OF_INSTANCES, 10) : null,
  dbConnectionString: process.env.DB_CONNECTION_STRING,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  smsFromNumber: process.env.TWILIO_FROM_NUMBER,
};

module.exports = {
  getValue(key) {
    if (key) {
      return config[key];
    }
    return undefined;
  },
};
