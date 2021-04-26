import Joi from 'joi';
import { checkValidMobileNumber } from '../utils/helpers';

export default Joi.object(({
    fullName: Joi.string()
      .pattern(new RegExp('[a-zA-Z. ]'))
      .min(3)
      .max(30)
      .required(),

    mobileNumber: Joi.string()
      .custom(checkValidMobileNumber, "valid mobile number")
      .required(),

    email: Joi.string()
      .email()
      .required(),

    accountType: Joi.string()
      .pattern(new RegExp('guardian|bride|groom')),

    password: Joi.string()
      .min(5)
      .max(30)
      .required(),

}));