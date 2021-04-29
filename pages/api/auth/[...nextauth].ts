import { createNC } from '../../../lib/utils/ncHandlers';
import NextAuth  from 'next-auth';
import Providers from 'next-auth/providers';
import DynamoDBAdapter from '../../../lib/utils/dynoNextAuthAdapter';
import authConfig from '../../../lib/config/authConfig';

const handler = createNC();

const providers = [
    Providers.Google({
        clientId: authConfig.googleClientId,
        clientSecret: authConfig.googleClientSecret
    })
];

const options = {
    providers,
    adapter: DynamoDBAdapter({})
}

const nextAuth = (req, res) => NextAuth(req, res, options)

export default handler.use(nextAuth);


// // handler
// //   .post(async (req, res, next) => {
// //
// //   });
//
// export default handler;