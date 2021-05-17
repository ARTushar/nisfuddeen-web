import Joi from 'joi';

const starTypes = ['incoming', 'outgoing'];

export default Joi.object({
    type: Joi.string()
      .valid(...starTypes)
      .required(),
});
