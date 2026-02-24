const Joi = require("joi");

exports.createPropertySchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow(""),
  price: Joi.number().positive().required(),
  location: Joi.string().required(),
  propertyType: Joi.string().valid("rent", "sale").required(),
});

exports.updatePropertySchema = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string().allow(""),
  price: Joi.number().positive(),
  location: Joi.string(),
  propertyType: Joi.string().valid("rent", "sale"),
});
