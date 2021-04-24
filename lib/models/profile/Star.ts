interface StarConstructorParams {
    accountId: string;
    starredAt: string;
}

export default class Star {
    accountId: string;
    starredAt: string;

    constructor({accountId, starredAt}: StarConstructorParams) {
        this.accountId = accountId;
        this.starredAt = starredAt;
    }
}