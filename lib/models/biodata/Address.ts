import { addressAliases as ada, AddressType, invertAlias } from '../../dataAccessLayer/utils/aliases';
import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { isEqual } from '../../utils/helpers';

interface AConstructorParams {
    type: string;
    country?: string;
    division?: string;
    district?: string;
    postOffice?: string;
}

export default class Address {
    type: string
    country: string;
    division: string;
    district: string;
    postOffice: string;

    constructor({type, country, division, district, postOffice}: AConstructorParams) {
        this.type = type;
        this.country = country;
        this.division = division;
        this.district = district;
        this.postOffice = postOffice;
    }

    mapToAlias(){
        return mapItemToAlias(ada, this);
    }
    static mapFromAlias(address): Address {
        return new Address({
            type: '',
            country: '', district: '', division: '', postOffice: '',
            ...mapItemFromAlias(ada, address)
        })
    }

    isEqual(obj: Address): boolean {
        return isEqual(this, obj)
    }
}