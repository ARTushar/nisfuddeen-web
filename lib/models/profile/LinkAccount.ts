import { Guardian, Relation } from '../../Types/types';

interface LAConstructorParams {
    relation: Guardian | Relation;
    accountId: string;
    createdAt: string;
}

export default class LinkAccount {
    relation: Guardian | Relation;
    accountId: string;
    createdAt: string;

    constructor({relation, accountId, createdAt}: LAConstructorParams) {
        this.relation = relation;
        this.accountId = accountId;
        this.createdAt = createdAt;
    }
}