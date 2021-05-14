import Joi from 'joi';
import { generateRegexFromEnumValues } from '../utils/helpers';

const requestTypes = ['incoming', 'outgoing'];

export default Joi.object(({
    type: Joi.string()
      .pattern(generateRegexFromEnumValues(requestTypes))
      .required(),
}));
