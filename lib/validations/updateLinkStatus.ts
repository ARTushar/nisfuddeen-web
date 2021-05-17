import Joi from 'joi';
import { getKeys } from '../scripts/utils/utils';
import { LinkStatus } from '../dataAccessLayer/utils/aliases';
import { genRxFmEnVals } from '../utils/helpers';


export default Joi.object({
    status: Joi.string()
      .pattern(genRxFmEnVals(getKeys(LinkStatus)))
      .required(),
});
