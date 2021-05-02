interface AConstructorParams {
    type: string;
    country: string;
    division: string;
    district: string;
    postOffice: string;
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

}