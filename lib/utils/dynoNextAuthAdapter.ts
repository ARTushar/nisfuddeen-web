import { createHash } from 'crypto';

import {
    CreateSessionError,
    CreateUserError,
    CreateVerificationRequestError,
    DeleteSessionError,
    DeleteUserError,
    DeleteVerificationRequestError,
    GetSessionError,
    GetUserByEmailError,
    GetUserByIdError,
    GetUserByProviderAccountIdError,
    GetVerificationRequestError,
    LinkAccountError,
    UnlinkAccountError,
    UpdateSessionError,
    UpdateUserError
} from 'next-auth/errors';
import User from '../models/user/User';
import Account from '../models/user/Account';
import Session from '../models/user/Session';

export default function DynamoDBAdapter(config) {
    const DynamoClient = new config.AWS.DynamoDB.DocumentClient()

    /** @param {import("next-auth/internals").AppOptions} appOptions */
    async function getAdapter(appOptions) {
        const logger = appOptions.logger

        function debug(debugCode, ...args) {
            logger.debug(`DYNAMODB_${debugCode}`, ...args)
        }

        const defaultSessionMaxAge = 30 * 24 * 60 * 60 * 1000;
        const sessionMaxAge = appOptions?.session?.maxAge
          ? appOptions.session.maxAge * 1000
          : defaultSessionMaxAge
        const sessionUpdateAge = appOptions?.session?.updateAge
          ? appOptions.session.updateAge * 1000
          : 0

        async function createUser(profile) {
            debug("createUser", profile)

            try {
                return await User.createAccount(profile.fullName, profile.email, profile.mobile, profile.accountType);
            } catch (error) {
                logger.error("CREATE_USER", error)
                throw new CreateUserError(error)
            }
        }

        async function getUser(id) {
            debug("getUser", id)

            try {
                return await User.getById(id);
            } catch (error) {
                logger.error("GET_USER", error)
                throw new GetUserByIdError(error)
            }
        }

        async function getUserByEmail(email) {
            debug("getUserByEmail", email)

            try {
                return await User.getByEmail(email);

            } catch (error) {
                logger.error("GET_USER_BY_EMAIL", error)
                throw new GetUserByEmailError(error)
            }
        }

        async function getUserByProviderAccountId(providerId, providerAccountId) {
            debug("getUserByProviderAccountId", providerId, providerAccountId)

            try {
                const account = await Account.getAccountByProviderAccountId(providerId, providerAccountId);
                if(!account) return null;
                return await User.getById(account.userId)
            } catch (error) {
                logger.error("GET_USER_BY_PROVIDER_ACCOUNT_ID", error)
                throw new GetUserByProviderAccountIdError(error)
            }
        }

        async function updateUser(user) {
            debug("updateUser", user)

            try {
                return await User.updateUser({
                    userId: user.userId,
                    fullName: user.fullName,
                    mobileNumber: user.mobileNumber,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    accountType: user.accountType,
                    subscriptionType: user.subscriptionType
                });
            } catch (error) {
                logger.error("UPDATE_USER_ERROR", error)
                throw new UpdateUserError(error)
            }
        }

        async function deleteUser(userId) {
            debug("deleteUser", userId)

            try {
                return await User.deleteUserById(userId)
            } catch (error) {
                logger.error("DELETE_USER_ERROR", error)
                throw new DeleteUserError(error)
            }
        }

        async function linkAccount(
          userId,
          providerId,
          providerType,
          providerAccountId,
          refreshToken,
          accessToken,
          accessTokenExpires
        ) {
            debug(
              "linkAccount",
              userId,
              providerId,
              providerType,
              providerAccountId,
              refreshToken,
              accessToken,
              accessTokenExpires
            )

            try {
                return Account.createAccount({
                    providerId, accountId: providerAccountId, providerType, refreshToken, accessToken, accessTokenExpires, userId
                });
            } catch (error) {
                logger.error("LINK_ACCOUNT_ERROR", error)
                throw new LinkAccountError(error)
            }
        }

        async function unlinkAccount(userId, providerId, providerAccountId) {
            debug("unlinkAccount", userId, providerId, providerAccountId)

            try {
                return await Account.deleteAccount(providerId, providerAccountId);
            } catch (error) {
                logger.error("UNLINK_ACCOUNT_ERROR", error)
                throw new UnlinkAccountError(error)
            }
        }

        async function createSession(user) {
            debug("createSession", user)

            try {
                return Session.createSession(user.userId, sessionMaxAge);
            } catch (error) {
                logger.error("CREATE_SESSION_ERROR", error)
                throw new CreateSessionError(error)
            }
        }

        async function getSession(sessionToken) {
            debug("getSession", sessionToken)

            try {
                return await Session.getSession(sessionToken)
            } catch (error) {
                logger.error("GET_SESSION_ERROR", error)
                throw new GetSessionError(error)
            }
        }

        async function updateSession(session, force) {
            debug("updateSession", session)

            try {
                const shouldUpdate =
                  sessionMaxAge &&
                  (sessionUpdateAge || sessionUpdateAge === 0) &&
                  session.expiresAt
                if (!shouldUpdate && !force) {
                    return null
                }

                // Calculate last updated date, to throttle write updates to database
                // Formula: ({expiry date} - sessionMaxAge) + sessionUpdateAge
                //     e.g. ({expiry date} - 30 days) + 1 hour
                //
                // Default for sessionMaxAge is 30 days.
                // Default for sessionUpdateAge is 1 hour.
                const dateSessionIsDueToBeUpdated = new Date(session.updatedAt).getTime() + sessionUpdateAge;

                // Trigger update of session expiry date and write to database, only
                // if the session was last updated more than {sessionUpdateAge} ago
                const currentDate = new Date().getTime();
                if (currentDate < dateSessionIsDueToBeUpdated && !force) {
                    return null
                }

                return await Session.updateSession(session, sessionMaxAge);

            } catch (error) {
                logger.error("UPDATE_SESSION_ERROR", error)
                throw new UpdateSessionError(error)
            }
        }

        async function deleteSession(sessionToken) {
            debug("deleteSession", sessionToken)

            try {
                const data = await DynamoClient.query({
                    TableName,
                    IndexName: "GSI1",
                    KeyConditionExpression: "#gsi1pk = :gsi1pk AND #gsi1sk = :gsi1sk",
                    ExpressionAttributeNames: {
                        "#gsi1pk": "GSI1PK",
                        "#gsi1sk": "GSI1SK",
                    },
                    ExpressionAttributeValues: {
                        ":gsi1pk": `SESSION#${sessionToken}`,
                        ":gsi1sk": `SESSION#${sessionToken}`,
                    },
                }).promise()

                if (data?.Items?.length <= 0) return null

                const infoToDelete = data.Items[0]

                const deleted = await DynamoClient.delete({
                    TableName,
                    Key: {
                        pk: infoToDelete.pk,
                        sk: infoToDelete.sk,
                    },
                }).promise()

                return deleted
            } catch (error) {
                logger.error("DELETE_SESSION_ERROR", error)
                throw new DeleteSessionError(error)
            }
        }

        async function createVerificationRequest(
          identifier,
          url,
          token,
          secret,
          provider
        ) {
            debug(
              "createVerificationRequest",
              identifier,
              url,
              token,
              secret,
              provider
            )

            const { baseUrl } = appOptions
            const { sendVerificationRequest, maxAge } = provider

            const hashedToken = createHash("sha256")
              .update(`${token}${secret}`)
              .digest("hex")

            let expires = null
            if (maxAge) {
                const dateExpires = new Date()
                dateExpires.setTime(dateExpires.getTime() + maxAge * 1000)

                expires = dateExpires.toISOString()
            }

            const now = new Date()

            const item = {
                pk: `VR#${identifier}`,
                sk: `VR#${hashedToken}`,
                token: hashedToken,
                identifier,
                type: "VR",
                expires: expires === null ? null : expires,
                createdAt: now.toISOString(),
                updatedAt: now.toISOString(),
            }

            try {
                await DynamoClient.put({ TableName, Item: item }).promise()

                await sendVerificationRequest({
                    identifier,
                    url,
                    token,
                    baseUrl,
                    provider,
                })

                return item
            } catch (error) {
                logger.error("CREATE_VERIFICATION_REQUEST_ERROR", error)
                throw new CreateVerificationRequestError(error)
            }
        }

        async function getVerificationRequest(identifier, token, secret, provider) {
            debug("getVerificationRequest", identifier, token, secret)

            const hashedToken = createHash("sha256")
              .update(`${token}${secret}`)
              .digest("hex")

            try {
                const data = await DynamoClient.get({
                    TableName,
                    Key: {
                        pk: `VR#${identifier}`,
                        sk: `VR#${hashedToken}`,
                    },
                }).promise()

                const nowDate = Date.now()
                if (data.Item && data.Item.expires && data.Item.expires < nowDate) {
                    // Delete the expired request so it cannot be used
                    await DynamoClient.delete({
                        TableName,
                        Key: {
                            pk: `VR#${identifier}`,
                            sk: `VR#${hashedToken}`,
                        },
                    }).promise()

                    return null
                }

                return data.Item || null
            } catch (error) {
                logger.error("GET_VERIFICATION_REQUEST_ERROR", error)
                throw new GetVerificationRequestError(error)
            }
        }

        async function deleteVerificationRequest(
          identifier,
          token,
          secret,
          provider
        ) {
            debug("deleteVerification", identifier, token, secret)

            const hashedToken = createHash("sha256")
              .update(`${token}${secret}`)
              .digest("hex")

            try {
                const data = await DynamoClient.delete({
                    TableName,
                    Key: {
                        pk: `VR#${identifier}`,
                        sk: `VR#${hashedToken}`,
                    },
                }).promise()

                return data
            } catch (error) {
                logger.error("DELETE_VERIFICATION_REQUEST_ERROR", error)
                throw new DeleteVerificationRequestError(error)
            }
        }

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
            deleteVerificationRequest,
        }
    }

    return {
        getAdapter,
    }
}