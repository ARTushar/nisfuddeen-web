import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { linkAliases } from '../../dataAccessLayer/utils/aliases';

interface LAConstructorParams {
    relation?: string;
    linkBy?: string;
    linkTo?: string;
    createdAt?: string;
    updatedAt?: string,
}

export default class Link {
    relation: string;
    linkBy: string;
    linkTo: string;
    createdAt: string;
    updatedAt: string;

    constructor({relation, linkBy, linkTo, createdAt, updatedAt}: LAConstructorParams) {
        this.relation = relation;
        this.linkBy = linkBy;
        this.linkTo = linkTo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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