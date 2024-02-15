const Joi = require("joi");

exports.createAddressSchema = Joi.object({
  house_name: Joi.string().required(),
  house_number: Joi.string().required(),
  moo: Joi.string().required(),
  soi: Joi.string(),
  street: Joi.string(),
});

exports.updateAddressSchema = Joi.object({
  house_name: Joi.string().required(),
  house_number: Joi.string().required(),
  moo: Joi.string().required(),
  soi: Joi.string(),
  street: Joi.string(),
})

exports.createPetOwnerSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  identity_number: Joi.string().required(),
  tel: Joi.string().required(),
});

exports.updatePetOwnerSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  identity_number: Joi.string().required(),
  tel: Joi.string().required(),
});

exports.createPetSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  gender: Joi.string().required(),
  color: Joi.string().required(),
  defect: Joi.string().required(),
  age: Joi.number().required(),
  vaccined: Joi.string().required(),
  vaccine_date: Joi.string(),
  sterilized: Joi.string().required(),
  location_id: Joi.string().required(),
  nature_id: Joi.string().required(),
});

exports.updatePetSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  gender: Joi.string().required(),
  color: Joi.string().required(),
  defect: Joi.string().required(),
  age: Joi.number().required(),
  vaccined: Joi.string().required(),
  vaccine_date: Joi.string(),
  sterilized: Joi.string().required(),
  locationId: Joi.number(),
  natureId: Joi.number(),
})

exports.createLocationSchema = Joi.object({
  name_location: Joi.string(),
  location: Joi.string().required(),
});

exports.updateLocationSchema = Joi.object({
  name_location: Joi.string(),
  location: Joi.string().required(),
})

exports.createNatureSchema = Joi.object({
  name_nature: Joi.string(),
});

exports.updateNatureSchema = Joi.object({
  name_nature: Joi.string(),
})

exports.createUnregisteredSchema = Joi.object({
  address_moo: Joi.string().required(),
  dog_amount: Joi.number().required(),
  cat_amount: Joi.number().required(),
  name_info: Joi.string().required(),
  vaccined: Joi.string(),
  vaccine_date: Joi.string(),
  sterilized: Joi.string(),
  location_id: Joi.string().required(),
});

exports.updateUnregisteredSchema = Joi.object({
  address_moo: Joi.string().required(),
  dog_amount: Joi.number().required(),
  cat_amount: Joi.number().required(),
  name_info: Joi.string().required(),
  vaccined: Joi.string(),
  vaccine_date: Joi.string(),
  sterilized: Joi.string(),
})

