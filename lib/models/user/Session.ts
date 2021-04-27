import createSession from '../../dataAccessLayer/entities/user/createSession';
import { errorFactory } from '../../utils/helpers';
import { createServerError } from '../../utils/errorCreators';
import { getSessionByToken } from '../../dataAccessLayer/entities/user/getSession';
import updateSession from '../../dataAccessLayer/entities/user/updateSession';

interface SessionConstructorParams {
    userId: string;
    sessionId: string;
    createdAt: string;
    expiresAt: string;
}

export default class Session {
    userId: string;
    sessionId: string;
    createdAt: string;
    expiresAt: string;
    static sessionExpiration: number = 7;

    constructor({userId, sessionId, createdAt, expiresAt}: SessionConstructorParams) {
        this.userId = userId;
        this.sessionId = sessionId;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }

    static async createSession(userId: string): Promise<Session> {
        const session: Session = await createSession(userId, this.sessionExpiration)
        if(!session) {
            throw errorFactory(new Error("Something went wrong"), createServerError);
        }
        return session;
    }

    static async getSession(sessionToken: string): Promise<Session> {
        const session: Session = await getSessionByToken(sessionToken);
        if(!session) {
            throw errorFactory(new Error("Something went wrong"), createServerError);
        }
        return session;
    }

    static async updateSession(sessionToken: string, userId: string): Promise<Session> {
        const session: Session = await updateSession(sessionToken, userId, this.sessionExpiration);
        if(!session) {
            throw errorFactory(new Error("Something went wrong"), createServerError);
        }
        return session;
    }
}