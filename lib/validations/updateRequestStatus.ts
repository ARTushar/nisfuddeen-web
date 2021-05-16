import Joi from 'joi';
import { getKeys } from '../scripts/utils/utils';
import { RequestStatus } from '../dataAccessLayer/utils/aliases';
import { genRxFmEnVals } from '../utils/helpers';

const requestStatus = getKeys(RequestStatus);

export default Joi.object({
    id: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{27}$'))
      .required(),

    status: Joi.string()
      .pattern(genRxFmEnVals(requestStatus))
      .required(),
});
