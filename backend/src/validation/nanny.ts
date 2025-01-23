import Joi, { ObjectSchema } from "joi";

export const nannySchema: ObjectSchema = Joi.object({
  name: Joi.string().required(),
  avatar: Joi.string().required(),
  birthday: Joi.date().required(),
  experience: Joi.string().required(),
  education: Joi.string().required(),
  kids_age: Joi.string().required(),
  price_per_hour: Joi.number().required(),
  location: Joi.string().required(),
  about: Joi.string().required(),
  characters: Joi.string().required(),
});

export const updateNannySchema: ObjectSchema = Joi.object({
  name: Joi.string(),
  avatar: Joi.string(),
  birthday: Joi.date(),
  experience: Joi.string(),
  education: Joi.string(),
  kids_age: Joi.string(),
  price_per_hour: Joi.number(),
  location: Joi.string(),
  about: Joi.string(),
  characters: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string())
  ),
}).min(1);
