import Joi from 'joi';

export default Joi.object({
    name: Joi.string(),
    mobileNumber: Joi.string(),
}).min(1)