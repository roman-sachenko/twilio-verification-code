const Joi = require('@hapi/joi');

const paramsSchema = Joi.object().keys({
  userId: Joi.string().alphanum().length(24).required(),
});

module.exports = {
  createOne({ body }) {
    const bodySchema = Joi.object().keys({
      phoneNumber: Joi.string().required(),
    });

    const resultBody = bodySchema.validate(body);
    if (!resultBody.error) {
      return true;
    }
    return { error: resultBody.error };
  },

  getOne({ params }) {
    const resultParams = paramsSchema.validate(params);
    if (!resultParams.error) {
      return true;
    }
    return { error: resultParams.error };

  },
};
