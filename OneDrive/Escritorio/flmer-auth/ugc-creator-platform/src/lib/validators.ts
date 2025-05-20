
import Joi from 'joi';

// Esquema de validación para login
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'El correo electrónico debe tener un formato válido',
    'string.empty': 'El correo electrónico es obligatorio',
    'any.required': 'El correo electrónico es obligatorio'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'La contraseña debe tener al menos 8 caracteres',
    'string.empty': 'La contraseña es obligatoria',
    'any.required': 'La contraseña es obligatoria'
  })
});

// Esquema de validación para registro
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'El correo electrónico debe tener un formato válido',
    'string.empty': 'El correo electrónico es obligatorio',
    'any.required': 'El correo electrónico es obligatorio'
  }),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9]).*$')).required().messages({
    'string.min': 'La contraseña debe tener al menos 8 caracteres',
    'string.pattern.base': 'La contraseña debe contener al menos una letra mayúscula y un número',
    'string.empty': 'La contraseña es obligatoria',
    'any.required': 'La contraseña es obligatoria'
  }),
  userType: Joi.string().valid('creador', 'marca', 'admin').required().messages({
    'any.only': 'El tipo de usuario debe ser: creador, marca o admin',
    'string.empty': 'El tipo de usuario es obligatorio',
    'any.required': 'El tipo de usuario es obligatorio'
  })
});
