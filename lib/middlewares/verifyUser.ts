import { getSession } from 'next-auth/client';
import { debug } from '../utils/helpers';
import { createForbiddenError } from '../utils/errorCreators';

export default async function(req, res, next){
    console.log('hello')
    const session = await getSession({ req })
    debug('verify_user_middleware', session);
    if(session) {
        req.user = session.user;
        next();
    } else {
        next(createForbiddenError('Unauthorized user'));
    }
}