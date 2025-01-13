import Joi, { ObjectSchema } from "joi";

export const appointmentSchema: ObjectSchema = Joi.object({
  nannyId: Joi.string().required(),
  date: Joi.date().required(),
  message: Joi.string().max(500).required(),
});

export const updateAppointmentSchema: ObjectSchema = Joi.object({
  date: Joi.date(),
  message: Joi.string().max(500),
}).min(1);
