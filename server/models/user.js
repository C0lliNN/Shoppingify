const mongoose = require('mongoose');
const Joi = require('joi');

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;

const MIN_EMAIL_LENGTH = 8;
const MAX_EMAIL_LENGTH = 255;

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 255;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: MIN_NAME_LENGTH,
    maxlength: MAX_NAME_LENGTH,
    required: true,
  },
  email: {
    type: String,
    minlength: MIN_EMAIL_LENGTH,
    maxlength: MAX_EMAIL_LENGTH,
  },
  password: {
    type: String,
    minlength: MIN_PASSWORD_LENGTH,
    maxlength: MAX_PASSWORD_LENGTH,
  },
});

const User = mongoose.model('users', userSchema);

function validateUser(data) {
  const validator = Joi.object({
    name: Joi.string().required().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .min(MIN_EMAIL_LENGTH)
      .max(MAX_EMAIL_LENGTH),
    password: Joi.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
  });
  return validator.validate(data);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;
