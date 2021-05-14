import Joi from 'joi';

export default Joi.object(({
    userId: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{27}$'))
      .required(),

}));
