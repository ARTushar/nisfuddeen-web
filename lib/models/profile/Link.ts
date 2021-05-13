import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { linkAliases } from '../../dataAccessLayer/utils/aliases';

interface LAConstructorParams {
    relation?: string;
    linkBy?: string;
    linkTo?: string;
    createdAt?: string;
    updatedAt?: string;
    status?: string,
}

export default class Link {
    relation: string;
    linkBy: string;
    linkTo: string;
    createdAt: string;
    updatedAt: string;
    status: string

    constructor({relation, linkBy, linkTo, createdAt, updatedAt, status}: LAConstructorParams) {
        this.relation = relation;
        this.linkBy = linkBy;
        this.linkTo = linkTo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
    }

    mapToAlias() {
        return mapItemToAlias(linkAliases, this);
    }

    static mapFromAlias(item) {
        return new Link({
            ...mapItemFromAlias(linkAliases, item)
        })
    }

}