import Joi from 'joi';
import { getKeys } from '../scripts/utils/utils';
import { Gender } from '../dataAccessLayer/utils/aliases';

export default Joi.object({
    id: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{27}$'))
      .required(),
    gender: Joi.string().valid(getKeys(Gender))
})