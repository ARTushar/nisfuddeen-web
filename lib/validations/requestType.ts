import Joi from 'joi';

const requestTypes = ['incoming', 'outgoing'];

export default Joi.object({
    type: Joi.string()
      .valid(...requestTypes)
      .required()
});
