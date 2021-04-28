import Account from '../../models/user/Account';
import User from '../../models/user/User';
import Session from '../../models/user/Session';

export function accountFactory(account): Account {
    return new Account({
        accessToken: account.at,
        accessTokenExpires: account.ate,
        accountId: account.aid,
        createdAt: account._ca,
        providerId: account.pid,
        providerType: account.pt,
        refreshToken: account.rt,
        updatedAt: account._ua,
        userId: account.uid
    });
}

export function userFactory(user): User {
    return new User({
        accountType: user.ac,
        createdAt: user._ca,
        email: user.em,
        fullName: user.fn,
        mobileNumber: user.mb,
        subscriptionType: user.st,
        updatedAt: user._ua,
        userId: user.id,
    });
}
export function sessionFactory(session): Session {
    return new Session({
        userId: session.uid,
        sessionId: session.sid,
        accessToken: session.at,
        createdAt: session.ca,
        updatedAt: session.ua,
        expiresAt: session.ea
    })
}
