import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { requestAliases } from '../../dataAccessLayer/utils/aliases';

interface RBConstructorParams {
    status?: string;
    requestBy?: string;
    requestTo?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default class Request {
    status: string;
    requestBy: string;
    requestTo: string;
    createdAt: string;
    updatedAt: string;

    constructor({status, requestBy, requestTo, createdAt, updatedAt}: RBConstructorParams) {
        this.status = status;
        this.requestBy = requestBy;
        this.requestTo= requestTo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    mapToAlias() {
        return mapItemToAlias(requestAliases, this);
    }

    static mapFromAlias(item) {
        return new Request({
            ...mapItemFromAlias(requestAliases, item)
        })
    }
}