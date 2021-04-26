interface SessionConstructorParams {
    userId: string;
    sessionId: string;
    createdAt: string;
    expiresAt: string;
}

export class Session {
    userId: string;
    sessionId: string;
    createdAt: string;
    expiresAt: string;


    constructor({userId, sessionId, createdAt, expiresAt}: SessionConstructorParams) {
        this.userId = userId;
        this.sessionId = sessionId;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }
}