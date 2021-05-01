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
    }),
    Providers.Facebook({
        clientId: authConfig.facebookClientId,
        clientSecret: authConfig.facebookClientSecret
    }),
    Providers.Email({
        server: {
            host: authConfig.emailHost,
            port: authConfig.emailPort,
            auth: {
                user: authConfig.emailUser,
                pass: authConfig.emailPassword
            }
        },
        from: authConfig.emailFrom
    })
];

const options = {
    providers,
    adapter: DynamoDBAdapter({}),
    callbacks: {
        async signIn(user, account, profile) {
            console.log(user);
            console.log(account);
            console.log(profile);
            return true;
        }
    }
}

const nextAuth = (req, res) => NextAuth(req, res, options)

export default handler.use(nextAuth);


// // handler
// //   .post(async (req, res, next) => {
// //
// //   });
//
// export default handler;