const Joi = require("joi");

const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/;

const createUserValidationSchema = Joi.object({
  name: Joi.string().required().min(2).max(40),
  email: Joi.string().required().email(),
  password: Joi.string().required().pattern(passwordPattern).messages({
    "string.pattern.base":
      "Password should contain min eight characters, at least one letter and one number.",
  }),
});

const loginValidationSchema = Joi.object().keys({
  email: createUserValidationSchema.extract("email"),
  password: createUserValidationSchema.extract("password"),
});

module.exports = {
  createUserValidationSchema,
  loginValidationSchema,
};
