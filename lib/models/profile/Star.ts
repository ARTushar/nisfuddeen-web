import { mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { starAliases } from '../../dataAccessLayer/utils/aliases';

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
            ...mapItemToAlias(starAliases, item)
        })
    }
}