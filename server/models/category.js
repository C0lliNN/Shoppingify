const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const MIN_CATEGORY_LENGTH = 3;
const MAX_CATEGORY_LENGTH = 120;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: MIN_CATEGORY_LENGTH,
    maxlength: MAX_CATEGORY_LENGTH,
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});

const Category = mongoose.model('categories', categorySchema);

function validateCategory(data) {
  const validator = Joi.object({
    name: Joi.string()
      .required()
      .min(MIN_CATEGORY_LENGTH)
      .max(MAX_CATEGORY_LENGTH),
    user: Joi.objectId().required(),
  });

  return validator.validate(data);
}

exports.Category = Category;
exports.categorySchema = categorySchema;
exports.validateCategory = validateCategory;
(exports.MIN_CATEGORY_LENGTH = MIN_CATEGORY_LENGTH),
  (exports.MAX_CATEGORY_LENGTH = MAX_CATEGORY_LENGTH);
