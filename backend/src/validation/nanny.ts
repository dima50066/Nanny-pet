import Joi, { ObjectSchema } from "joi";

export const nannySchema: ObjectSchema = Joi.object({
  name: Joi.string().required(),
  avatar_url: Joi.string().uri().required(),
  birthday: Joi.date().required(),
  experience: Joi.string().required(),
  education: Joi.string().required(),
  kids_age: Joi.string().required(),
  price_per_hour: Joi.number().required(),
  location: Joi.string().required(),
  about: Joi.string().required(),
  characters: Joi.array().items(Joi.string()).required(),
});

export const updateNannySchema: ObjectSchema = Joi.object({
  name: Joi.string(),
  avatar_url: Joi.string().uri(),
  birthday: Joi.date(),
  experience: Joi.string(),
  education: Joi.string(),
  kids_age: Joi.string(),
  price_per_hour: Joi.number(),
  location: Joi.string(),
  about: Joi.string(),
  characters: Joi.array().items(Joi.string()),
}).min(1);
