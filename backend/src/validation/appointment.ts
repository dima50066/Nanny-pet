import Joi, { ObjectSchema } from "joi";

export const appointmentSchema: ObjectSchema = Joi.object({
  nannyId: Joi.string().required(),
  date: Joi.date().required(),
  address: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .required(),
  childAge: Joi.number().min(0).max(18).required(),
  email: Joi.string().email().required(),
  parentName: Joi.string().required(),
  meetingTime: Joi.string().required(),
  comment: Joi.string().required(),
});

export const updateAppointmentSchema: ObjectSchema = Joi.object({
  date: Joi.date(),
  address: Joi.string(),
  phone: Joi.string().pattern(/^\+380\d{9}$/),
  childAge: Joi.number().min(0).max(18),
  email: Joi.string().email(),
  parentName: Joi.string(),
  meetingTime: Joi.string(),
  comment: Joi.string(),
}).min(1);
