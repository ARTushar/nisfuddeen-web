import { RequestBiodataStatus, RequestBiodataType } from '../../Types/types';

interface RBConstructorParams {
    type: RequestBiodataType;
    status: RequestBiodataStatus;
    accountId: string;
    createdAt: string;
    updatedAt: string;
}

export default class RequestBiodata {
    type: RequestBiodataType;
    status: RequestBiodataStatus;
    accountId: string;
    createdAt: string;
    updatedAt: string;

    constructor({type, status, accountId, createdAt, updatedAt}: RBConstructorParams) {
        this.type = type;
        this.status = status;
        this.accountId = accountId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}