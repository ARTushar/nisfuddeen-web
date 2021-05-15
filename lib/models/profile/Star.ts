import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { starAliases } from '../../dataAccessLayer/utils/aliases';
import { getStarsBy, getStarsTo } from '../../dataAccessLayer/entities/profile/getStars';
import deleteStar from '../../dataAccessLayer/entities/profile/deleteStar';
import createStar from '../../dataAccessLayer/entities/profile/createStar';

interface StarConstructorParams {
    starBy?: string;
    starTo?: string;
    starredAt?: string;
}

export default class Star {
    starBy: string;
    starTo: string;
    starredAt: string;

    constructor({starBy, starTo, starredAt}: StarConstructorParams) {
        this.starBy = starBy;
        this.starTo = starTo;
        this.starredAt = starredAt;
    }

    mapToAlias() {
        return mapItemToAlias(starAliases, this);
    }

    static mapFromAlias(item) {
        return new Star({
            ...mapItemFromAlias(starAliases, item)
        })
    }

    static async getStarsBy(userId: string) {
        try {
            return await getStarsBy(userId);
        } catch (e) {
            throw e;
        }
    }

    static async getStarsTo(userId: string) {
        try {
            return await getStarsTo(userId);
        } catch (e) {
            throw e;
        }
    }

    static async deleteStar(by: string, to: string) {
        if(by === to) return null;
        try {
            return await deleteStar(by, to);
        } catch (e) {
            throw e;
        }
    }

    static async createStar(by: string, to: string) {
        if(by === to) return null;
        try {
            return await createStar(by, to);
        } catch (e) {
            throw e;
        }
    }
}