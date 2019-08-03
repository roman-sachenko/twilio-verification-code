const Joi = require('@hapi/joi');

const paramsSchema = Joi.object().keys({
  userId: Joi.string().alphanum().length(24).required(),
});

module.exports = {
  sendCode({ params }) {
    const resultParams = paramsSchema.validate(params);
    if (!resultParams.error) {
      return true;
    }
    return { error: resultParams.error };
  },

  verifyCode({ params, body }) {
    const bodySchema = Joi.object().keys({
      verificationCode: Joi.string().length(4).required(),
    });

    const resultParams = paramsSchema.validate(params);
    const resultBody = bodySchema.validate(body);

    const error = { ...resultBody.error, ...resultParams.error };

    if (error && Object.keys(error) && Object.keys(error).length) {
      return { error };
    }

    return true;
  },
};
