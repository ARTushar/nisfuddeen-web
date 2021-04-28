import { Profile, User as NextUser, Session as NextSession } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import User from '../models/user/User';
import Session from '../models/user/Session';
import { inverseAccountTypeFactory, inverseSubscriptionFactory } from '../Types/factoryTypes';

export default function DynoAdapter (config, options = {}): Adapter {
    async function getAdapter (appOptions) {
        // Display debug output if debug option enabled
        function _debug (...args) {
            if (appOptions.debug) {
                console.log('[next-auth][debug]', ...args)
            }
        }

        async function createUser (profile: Profile): Promise<NextUser>{
            _debug('createUser', profile)
            console.log("hi i'm being called inside adapter create user");
            try{
                const user: User = await User.createAccount(profile.fullName, profile.email, profile.mobileNumber, profile.accountType)
                return {
                    userId: user.userId,
                    fullName: user.fullName,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    accountType: inverseAccountTypeFactory(user.accountType),
                    subscriptionType: inverseSubscriptionFactory(user.subscriptionType)
                }
            } catch (e) {
                return Promise.reject(e)
            }
        }

        async function getUser (id: string) {
            _debug('getUser', id)
            return null;
        }

        async function getUserByEmail (email) {
            _debug('getUserByEmail', email)
            return null
        }

        async function getUserByProviderAccountId (providerId, providerAccountId) {
            _debug('getUserByProviderAccountId', providerId, providerAccountId)
            return null
        }

        async function updateUser (user) {
            _debug('updateUser', user)
            return null
        }

        async function deleteUser (userId) {
            _debug('deleteUser', userId)
            return null
        }

        async function linkAccount (userId, providerId, providerType, providerAccountId, refreshToken, accessToken, accessTokenExpires) {
            _debug('linkAccount', userId, providerId, providerType, providerAccountId, refreshToken, accessToken, accessTokenExpires)
            return null
        }

        async function unlinkAccount (userId, providerId, providerAccountId) {
            _debug('unlinkAccount', userId, providerId, providerAccountId)
            return null
        }

        async function createSession (user: NextUser): Promise<NextSession> {
            _debug('createSession', user)
            try {
                const session:Session = await Session.createSession(user.userId);
                return {
                    sessionToken: session.sessionId,
                    userid: session.sessionId,
                    createdAt: session.createdAt,
                    expiresAt: session.expiresAt
                }
            } catch (e) {
                return Promise.reject(e)
            }
        }

        async function getSession (sessionToken) {
            _debug('getSession', sessionToken)
            try {
                const session:Session = await Session.getSession(sessionToken);
                return {
                    sessionToken: session.sessionId,
                    userid: session.sessionId,
                    createdAt: session.createdAt,
                    expiresAt: session.expiresAt
                }
            } catch (e) {
                return Promise.reject(e);
            }
        }

        async function updateSession (oldSession: NextSession): Promise<NextSession> {
            _debug('updateSession', oldSession)
            try {
                const session:Session = await Session.updateSession(oldSession.sessionToken, oldSession.userid);
                return {
                    sessionToken: session.sessionId,
                    userid: session.userId,
                    createdAt: oldSession.createdAt,
                    expiresAt: session.expiresAt
                };
            } catch (e) {
                return Promise.reject(e);
            }
        }

        async function deleteSession (sessionToken) {
            _debug('deleteSession', sessionToken)
            return null
        }

        async function createVerificationRequest (identifier, url, token, secret, provider) {
            _debug('createVerificationRequest', identifier)
            return null
        }

        async function getVerificationRequest (identifier, token, secret, provider) {
            _debug('getVerificationRequest', identifier, token)
            return null
        }

        async function deleteVerificationRequest (identifier, token, secret, provider) {
            _debug('deleteVerification', identifier, token)
            return null
        }
        // async function getUserByCredentials()

        return {
            createUser,
            getUser,
            getUserByEmail,
            getUserByProviderAccountId,
            updateUser,
            deleteUser,
            linkAccount,
            unlinkAccount,
            createSession,
            getSession,
            updateSession,
            deleteSession,
            createVerificationRequest,
            getVerificationRequest,
            deleteVerificationRequest
        }
    }

    return {
        getAdapter
    }
}