import createSession from '../../dataAccessLayer/entities/user/createSession';
import { getSessionByToken } from '../../dataAccessLayer/entities/user/getSession';
import updateSession from '../../dataAccessLayer/entities/user/updateSession';
import { deleteSessionByToken } from '../../dataAccessLayer/entities/user/deleteSession';
import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { sessionAliases } from '../../dataAccessLayer/utils/aliases';

interface SessionConstructorParams {
    userId: string;
    sessionToken: string;
    accessToken?: string;
    createdAt?: string;
    updatedAt?: string;
    expiresAt?: string;
}

export default class Session {
    userId: string;
    sessionToken: string;
    accessToken: string;
    createdAt: string;
    updatedAt: string;
    expires: string;

    constructor({userId, sessionToken, accessToken, createdAt, updatedAt, expiresAt}: SessionConstructorParams) {
        this.userId = userId;
        this.sessionToken = sessionToken;
        this.accessToken = accessToken;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.expires = expiresAt;
    }

    mapToAlias() {
        return mapItemToAlias(sessionAliases, this);
    }

    static mapFromAlias(item): Session {
        return new Session({
            sessionToken: '', userId: '',
            ...mapItemFromAlias(sessionAliases, item)
        })
    }

    static async createSession(userId: string, sessionExpiration: number): Promise<Session> {
        try {
            return await createSession(userId, sessionExpiration)
        } catch (e) {
            throw e;
        }
    }

    static async getSession(sessionToken: string): Promise<Session> {
        try {
            return await getSessionByToken(sessionToken);
        } catch (e) {
            throw e;
        }
    }

    static async updateSession(session: Session, sessionExpiration): Promise<Session> {
        try {
            return await updateSession(session, sessionExpiration);
        } catch (e) {
            throw e;
        }
    }

    static async deleteSession(sessionToken: string): Promise<boolean> {
        try {
            return await deleteSessionByToken(sessionToken);
        } catch (e) {
            throw e;
        }
    }
}