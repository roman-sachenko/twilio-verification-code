const DbService = require('../shared/db.service');

const schemaData = {
  phoneNumber: { type: String, unique: true, require: true },
  isVerified: { type: Boolean, required: true, default: false },
  verificationCode: { type: String },
};

const schemaOptions = {
  toJSON: { getters: true },
  toObject: { getters: true },
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};

module.exports = DbService.createSchema(schemaData, schemaOptions);
