const Joi = require("joi");

exports.createSubdistrictSchema = Joi.object({
  name: Joi.string().required(),
  sub_district: Joi.string().required(),
  district: Joi.string().required(),
  province: Joi.string().required(),
  zipcode: Joi.string(),
});

exports.updateSubdistrictSchema = Joi.object({
  name: Joi.string().required(),
  sub_district: Joi.string().required(),
  district: Joi.string().required(),
  province: Joi.string().required(),
  zipcode: Joi.string(),
})

exports.createRecorderSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string(),
  subdistrictId: Joi.string().required().strip(),
});

exports.updateRecorderSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string(),
});

exports.createNew = Joi.object({
  title: Joi.string().required()
})