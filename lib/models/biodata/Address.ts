export class Address {
    country: string;
    division: string;
    district: string;
    postOffice: string;

    constructor(country, division, district, postOffice) {
        this.country = country;
        this.division = division;
        this.district = district;
        this.postOffice = postOffice;
    }

}