const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;

const MIN_EMAIL_LENGTH = 8;
const MAX_EMAIL_LENGTH = 255;

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 255;

const TOKEN_EXPIRATION_TIME = 3600; // seconds

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: MIN_NAME_LENGTH,
    maxlength: MAX_NAME_LENGTH,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: MIN_EMAIL_LENGTH,
    maxlength: MAX_EMAIL_LENGTH,
  },
  password: {
    type: String,
    required: true,
    minlength: MIN_PASSWORD_LENGTH,
    maxlength: MAX_PASSWORD_LENGTH,
  },
});

userSchema.methods.generateToken = function () {
  const key = process.env.JWT_KEY || 'TEST';
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    key,
    { expiresIn: TOKEN_EXPIRATION_TIME }
  );
  return token;
};

const User = mongoose.model('users', userSchema);

function validateUser(data) {
  const validator = Joi.object({
    name: Joi.string().required().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .min(MIN_EMAIL_LENGTH)
      .max(MAX_EMAIL_LENGTH),
    password: Joi.string()
      .required()
      .min(MIN_PASSWORD_LENGTH)
      .max(MAX_PASSWORD_LENGTH),
  });
  return validator.validate(data);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;
exports.TOKEN_EXPIRATION_TIME = TOKEN_EXPIRATION_TIME;
