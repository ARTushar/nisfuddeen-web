import Joi from 'joi';
import { genRxFmEnVals } from '../utils/helpers';

const requestTypes = ['incoming', 'outgoing'];

export default Joi.object({
    type: Joi.string()
      .pattern(genRxFmEnVals(requestTypes))
      .required(),
});
