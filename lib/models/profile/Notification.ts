interface ConstructorParams {
    notificationId: string;
    userId: string;
    body: string;
    status: string;
}

export default class Notification {
    notificationId: string;
    userId: string;
    body: string;
    status: string;


    constructor({notificationId, userId, body, status}: ConstructorParams) {
        this.notificationId = notificationId;
        this.userId = userId;
        this.body = body;
        this.status = status;
    }
}