import Joi from 'joi';
import { generateRegexFromEnumValues } from '../utils/helpers';

const starTypes = ['incoming', 'outgoing'];

export default Joi.object(({
    type: Joi.string()
      .pattern(generateRegexFromEnumValues(starTypes))
      .required(),
}));
