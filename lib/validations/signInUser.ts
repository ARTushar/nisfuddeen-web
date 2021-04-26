import Joi from 'joi';
import { checkValidMobileNumber } from '../utils/helpers';

export const singInUserByMobileNumber = Joi.object(({
    mobileNumber: Joi.string()
      .custom(checkValidMobileNumber, "valid mobile number")
      .required(),

    password: Joi.string()
      .min(5)
      .max(30)
      .required(),
}));

export const singInUserByEmail = Joi.object(({
    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .min(5)
      .max(30)
      .required(),
}));