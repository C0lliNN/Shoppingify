const mongoose = require('mongoose');
const Joi = require('joi');

const MIN_CATEGORY_LENGTH = 3;
const MAX_CATEGORY_LENGTH = 120;

const Category = mongoose.model(
  'categories',
  new mongoose.Schema({
    name: {
      type: String,
      minlength: MIN_CATEGORY_LENGTH,
      maxlength: MAX_CATEGORY_LENGTH,
      required: true,
    },
  })
);

function validateCategory(data) {
  const validator = Joi.object({
    name: Joi.string()
      .required()
      .min(MIN_CATEGORY_LENGTH)
      .max(MAX_CATEGORY_LENGTH),
  });

  return validator.validate(data);
}

exports.Category = Category;
exports.validateCategory = validateCategory;
