import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { linkAliases } from '../../dataAccessLayer/utils/aliases';
import createLink from '../../dataAccessLayer/entities/profile/createLink';
import deleteLink from '../../dataAccessLayer/entities/profile/deleteLink';
import getLinks from '../../dataAccessLayer/entities/profile/getLinks';
import { createBadRequestError } from '../../utils/errorCreators';
import updateStatusLink from '../../dataAccessLayer/entities/profile/updateStatusLink';

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

    static async createLink(by: string, to: string, relation: string) {
        if(by === to) return null;
        try {
            return await createLink(by, to, relation);
        } catch (e) {
            throw e;
        }
    }

    static async deleteLink(by: string, to: string) {
        if(by === to) return null;
        try {
            return await deleteLink(by, to);
        } catch (e) {
            throw e;
        }
    }

    static async getLinks(userId: string) {
        try {
            return await getLinks(userId);
        } catch (e) {
            throw e;
        }
    }
    static async updateLinkStatus(by: string, to: string, status: string) {
        if(by === to) return null;
        try {
            return await updateStatusLink(by, to, status);
        } catch (e) {
            throw e;
        }
    }
}