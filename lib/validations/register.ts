import Joi from 'joi';
import { checkValidMobileNumber } from '../utils/helpers';

export default Joi.object(({
    name: Joi.string()
      .pattern(new RegExp('[a-zA-Z. ]'))
      .min(3)
      .max(30)
      .required(),

    mobileNumber: Joi.string()
      .custom(checkValidMobileNumber, "valid mobile number")
      .required(),

    accountType: Joi.string()
      .pattern(new RegExp('^(guardian|bride|groom)$'))
      .required(),

    gender: Joi.string()
      .pattern(new RegExp('^(male|female)$'))
      .required(),
}));