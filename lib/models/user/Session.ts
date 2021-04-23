export class Session {
    userId: string;
    sessionId: string;
    createdAt: string;
    expiredAt: string;

    constructor(userId: string, sessionId: string, createdAt: string, expiredAt: string) {
        this.userId = userId;
        this.sessionId = sessionId;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt
    }
}