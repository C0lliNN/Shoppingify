const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const { MIN_CATEGORY_LENGTH, MAX_CATEGORY_LENGTH } = require('./category');

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
      minlength: MIN_NAME_LENGTH,
      maxlength: MAX_NAME_LENGTH,
    },
    note: {
      type: String,
      maxlength: MAX_NOTE_LENGTH,
    },
    category: {
      type: new mongoose.Schema({
        name: {
          type: String,
          min: MIN_CATEGORY_LENGTH,
          max: MAX_CATEGORY_LENGTH,
          required: true,
        },
      }),
      required: true,
    },
    image: {
      type: String,
      min: MIN_IMAGE_LENGTH,
      max: MAX_IMAGE_LENGTH,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
  })
);

function validateItem(data) {
  if (typeof data.category === 'string') {
    try {
      const category = JSON.parse(data.category);
      data.category = category;
    } catch (error) {
      console.log(error.message);
      return { error: 'Invalid Category Object' };
    }
  }

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
    user: Joi.objectId().required(),
  });

  return validator.validate(data);
}

exports.Item = Item;
exports.validateItem = validateItem;
