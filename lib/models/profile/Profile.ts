import Link from './Link';
import Request from './Request';
import Star from './Star';
import Biodata from '../biodata/Biodata';

interface ProfileConstructorParams {
    links: Link[];
    sentRequests: Request[];
    receivedRequests: Request[];
    stars: Star[];
    biodata?: Biodata;
}

export default class Profile {
    links: Link[];
    sentRequests: Request[];
    receivedRequests: Request[];
    stars: Star[];
    biodata: Biodata;


    constructor({links, sentRequests, receivedRequests, stars, biodata}: ProfileConstructorParams) {
        this.links = links;
        this.sentRequests = sentRequests;
        this.receivedRequests = receivedRequests;
        this.stars = stars;
        this.biodata = biodata;
    }
}