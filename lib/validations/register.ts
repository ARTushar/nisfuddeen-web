import Joi from 'joi';
import { checkValidMobileNumber, genRxFmEnVals } from '../utils/helpers';
import { getKeys } from '../scripts/utils/utils';
import { AccountType, Gender } from '../dataAccessLayer/utils/aliases';


const accountTypes = getKeys(AccountType);
const genderTypes = getKeys(Gender);


export default Joi.object({
    name: Joi.string()
      .pattern(new RegExp('[a-zA-Z. ]'))
      .min(3)
      .max(30)
      .required(),

    mobileNumber: Joi.string()
      .custom(checkValidMobileNumber, "valid mobile number")
      .required(),

    accountType: Joi.string()
      .pattern(genRxFmEnVals(accountTypes))
      .required(),

    gender: Joi.string()
      .pattern(genRxFmEnVals(genderTypes))
      .required(),
});