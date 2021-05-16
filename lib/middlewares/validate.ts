import { debug, objStringify } from '../utils/helpers';
import { createBadRequestError } from '../utils/errorCreators';
import Joi from 'joi';

export default function createValidation(schema: Joi.Schema, type: string) {
    return async function(req, res, next) {
        if (!schema) {
            debug('no validation schema found');
            return next();
        } else {
            if (req[type] === undefined) {
                debug(type, 'not found in the request');
                return next(createBadRequestError("Missing " + type + " in the request"));
            }
            try {
                const value = await schema.validateAsync(req[type], {
                    allowUnknown: true
                })
                debug('successfully validated', objStringify(value));
            } catch (e) {
                return next(createBadRequestError(e.message));
            }
            return next();
        }
    }
}