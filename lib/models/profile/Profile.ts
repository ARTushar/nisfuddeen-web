import LinkAccount from './LinkAccount';
import RequestBiodata from './RequestBiodata';
import Star from './Star';
import Biodata from '../biodata/Biodata';

interface ProfileConstructorParams {
    linkAccounts: LinkAccount[];
    requestBiodatas: RequestBiodata[];
    stars: Star[];
    biodata?: Biodata | null;
}

export default class Profile {
    linkAccounts: LinkAccount[];
    requestBiodatas: RequestBiodata[];
    stars: Star[];
    biodata: Biodata | null;


    constructor({linkAccounts, requestBiodatas, stars, biodata=null}: ProfileConstructorParams) {
        this.linkAccounts = linkAccounts;
        this.requestBiodatas = requestBiodatas;
        this.stars = stars;
        this.biodata = biodata;
    }
}