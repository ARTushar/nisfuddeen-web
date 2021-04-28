import createSession from '../../dataAccessLayer/entities/user/createSession';
import { getSessionByToken } from '../../dataAccessLayer/entities/user/getSession';
import updateSession from '../../dataAccessLayer/entities/user/updateSession';

interface SessionConstructorParams {
    userId: string;
    sessionId: string;
    accessToken: string;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
}

export default class Session {
    userId: string;
    sessionId: string;
    accessToken: string;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
    static sessionExpiration: number = 30 * 24 * 60 * 60 * 1000;

    constructor({userId, sessionId, accessToken, createdAt, updatedAt, expiresAt}: SessionConstructorParams) {
        this.userId = userId;
        this.sessionId = sessionId;
        this.accessToken = accessToken;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.expiresAt = expiresAt;
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
}