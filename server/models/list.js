const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { MIN_ITEM_NAME_LENGTH, MAX_ITEM_NAME_LENGTH } = require('./item');
const { MIN_CATEGORY_LENGTH, MAX_CATEGORY_LENGTH } = require('./category');

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
const VALID_STATUS_VALUES = ['active', 'completed', 'canceled'];

const List = mongoose.model(
  'lists',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: MIN_NAME_LENGTH,
      maxlength: MAX_NAME_LENGTH,
    },
    itens: {
      type: [
        {
          _id: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
          },
          name: {
            type: String,
            required: true,
            min: MIN_ITEM_NAME_LENGTH,
            maxlength: MAX_ITEM_NAME_LENGTH,
          },
          quantity: {
            type: Number,
            required: true,
            get: (value) => Math.round(value),
            set: (value) => Math.round(value),
            min: 1,
          },
          category: {
            type: new mongoose.Schema({
              name: {
                type: String,
                required: true,
                min: MIN_CATEGORY_LENGTH,
                max: MAX_CATEGORY_LENGTH,
              },
            }),
            required: true,
          },
        },
      ],
      required: true,
      validate: [
        (array) => array.length >= 1,
        '{PATH} should have at least 1 item',
      ],
    },
    status: {
      type: String,
      enum: VALID_STATUS_VALUES,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
  })
);

function validateList(data) {
  const validator = Joi.object({
    name: Joi.string().required().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH),
    itens: Joi.array()
      .items(
        Joi.object({
          _id: Joi.objectId().required(),
          name: Joi.string()
            .required()
            .min(MIN_ITEM_NAME_LENGTH)
            .max(MAX_ITEM_NAME_LENGTH),
          category: Joi.object({
            _id: Joi.objectId().required(),
            name: Joi.string()
              .required()
              .min(MIN_CATEGORY_LENGTH)
              .max(MAX_CATEGORY_LENGTH),
          }).required(),
          quantity: Joi.number().integer().required().min(1),
        })
      )
      .required()
      .min(1),
    status: Joi.string()
      .required()
      .valid(
        VALID_STATUS_VALUES[0],
        VALID_STATUS_VALUES[1],
        VALID_STATUS_VALUES[2]
      ),
  }).required();
  return validator.validate(data);
}

exports.List = List;
exports.MIN_LIST_NAME_LENGTH = MIN_NAME_LENGTH;
exports.MAX_LIST_NAME_LENGTH = MAX_NAME_LENGTH;
exports.validateList = validateList;
