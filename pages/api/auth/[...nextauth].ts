import { createNC } from '../../../lib/utils/ncHandlers';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { Profile, User as NextUser, Session as NextSession } from 'next-auth';
import User from '../../../lib/models/user/User';
import { inverseAccountTypeFactory, inverseSubscriptionFactory } from '../../../lib/Types/factoryTypes';

const handler = createNC();

const providers = [
    Providers.Credentials({
        name: 'Credentials',
        authorize: async (credentials:any): Promise<any> => {
            try {
                const user = await User.loginByEmail(credentials.email, credentials.password);
                if(user) return {
                    userId: user.userId,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    accountType: inverseAccountTypeFactory(user.accountType),
                    subscriptionType: inverseSubscriptionFactory(user.subscriptionType)
                }
                return null
            } catch (e) {
                return Promise.reject(e);
            }
        }
    })
];

const options = {
    providers
}

const nextAuth = (req, res) => NextAuth(req, res, options)

export default handler.use(nextAuth);


// // handler
// //   .post(async (req, res, next) => {
// //
// //   });
//
// export default handler;