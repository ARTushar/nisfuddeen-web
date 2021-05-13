import { debug, objStringify } from '../utils/helpers';
import { createBadRequestError } from '../utils/errorCreators';

export default function createValidation(schema, types) {
    return async function(req, res, next) {
        if (!schema) {
            debug('no validation schema found');
            return next();
        } else {
            for (const type of types) {
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
            }
            return next();
        }
    }
}