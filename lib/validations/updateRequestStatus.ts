import Joi from 'joi';
import { getKeys } from '../scripts/utils/utils';
import { RequestStatus } from '../dataAccessLayer/utils/aliases';

const requestStatus = getKeys(RequestStatus);

export default Joi.object({
    id: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{27}$'))
      .required(),

    status: Joi.string()
      .valid(...requestStatus)
      .required(),
});
