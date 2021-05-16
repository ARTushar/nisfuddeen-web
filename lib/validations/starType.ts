import Joi from 'joi';
import { genRxFmEnVals } from '../utils/helpers';

const starTypes = ['incoming', 'outgoing'];

export default Joi.object({
    type: Joi.string()
      .pattern(genRxFmEnVals(starTypes))
      .required(),
});
