interface SessionConstructorParams {
    userId: string;
    sessionId: string;
    createdAt: string;
    expiredAt: string;
}

export class Session {
    userId: string;
    sessionId: string;
    createdAt: string;
    expiredAt: string;

    constructor({userId, sessionId, createdAt, expiredAt}: SessionConstructorParams) {
        this.userId = userId;
        this.sessionId = sessionId;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt
    }
}