import { AddressType } from '../../Types/types';

interface AConstructorParams {
    country: string;
    division: string;
    district: string;
    postOffice: string;
}

export default class Address {
    type: AddressType
    country: string;
    division: string;
    district: string;
    postOffice: string;

    constructor({country, division, district, postOffice}: AConstructorParams) {
        this.country = country;
        this.division = division;
        this.district = district;
        this.postOffice = postOffice;
    }

}