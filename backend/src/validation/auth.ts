import Joi, { ObjectSchema } from "joi";

export const registerUserSchema: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("client", "nanny").optional().default("client"),
});

export const loginUserSchema: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const requestResetEmailSchema: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema: ObjectSchema = Joi.object({
  newPassword: Joi.string().required(),
  token: Joi.string().required(),
});
