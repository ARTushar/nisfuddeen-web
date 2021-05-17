import Joi from 'joi';
import { getKeys } from '../scripts/utils/utils';
import { LinkStatus } from '../dataAccessLayer/utils/aliases';


export default Joi.object({
    status: Joi.string()
      .valid(...getKeys(LinkStatus))
      .required(),
});
