const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const {
  categorySchema,
  MIN_CATEGORY_LENGTH,
  MAX_CATEGORY_LENGTH,
} = require('./category');

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 40;
const MAX_NOTE_LENGTH = 255;
const MIN_IMAGE_LENGTH = 4;
const MAX_IMAGE_LENGTH = 255;

const Item = mongoose.model(
  'itens',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: MIN_NAME_LENGTH,
      maxlength: MAX_NAME_LENGTH,
    },
    note: {
      type: String,
      maxlength: MAX_NOTE_LENGTH,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    image: {
      type: String,
      min: MIN_IMAGE_LENGTH,
      max: MAX_IMAGE_LENGTH,
    },
  })
);

function validateItem(data) {
  const validator = Joi.object({
    name: Joi.string().required().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH),
    note: Joi.string().max(MAX_NOTE_LENGTH),
    category: Joi.object({
      _id: Joi.objectId(),
      name: Joi.string()
        .required()
        .min(MIN_CATEGORY_LENGTH)
        .max(MAX_CATEGORY_LENGTH),
    }).required(),
  });

  return validator.validate(data);
}

exports.Item = Item;
exports.validateItem = validateItem;
