const configObject = {
  smsFromNumber: '+1234567890',
};

module.exports = {
  getValue: (item) => {
    return configObject[item];
  },
};
