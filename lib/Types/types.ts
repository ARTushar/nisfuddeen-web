export enum Gender {
    Male,
    Female
}

export enum MaritalStatus {
    Unmarried,
    Married,
    Divorced,
    Widow
}

export enum FacialColor {
    PinkishWhite,
    PaleWhite,
    FairWhite,
    MediumFair,
    LightBrown,
    ModerateBrown,
    Black
}

export enum BloodGroup {
    ABPos,
    ABNeg,
    APos,
    ANeg,
    BPos,
    BNeg,
    OPos,
    ONeg,
}

export enum BeardStyle {
    CircleBeard,
    RoyaleBeard,
    GoateeBeard,
    PetiteBeard,
    VanDykeBeard,
    ShortBoxedBeard,
    BalboBeard,
    AnchorBeard,
    Chevron,
    HorseShoeMustache,
    OriginalStache,
    ChinStrip,
    ChinStrap,
    SunnatiBeard
}

export enum FinancialStatus {
    UpperClass,
    UpperMiddleClass,
    MiddleClass,
    LowerMiddleClass,
    LowerClass
}

export enum MarriageReply {
    Yes,
    No,
    YesIfSpouseAgrees
}

export enum AfterMarriageStudyReply {
    Yes,
    No,
    YesIfOnline,
    YesIfHome,
    YesIfOnlineOrHome
}

export enum BoyOutfit {
    Panjabi,
    Pant,
    Shirt,
    AboveKnee
}

export enum GirlOutfit {
    Abaya,
    Hijab,
    WesternDress,
    Scarf,
    Zilbab,
    Khimar,
    SalwarKamiz,
    ShortBurqa,
    Tops,
    Leggings,
    Dupatta,
    Shirt,
    Shari,
    Niqab,
    HandSocks,
    FeetSocks,
}


export enum MixAnswer {
    Yes,
    No,
    NoButTryTo,
    Almost,
    Somewhat
}

export enum PositiveAnswer {
    Yes,
    NoButTryTo,
    No
}

export enum NegativeAnswer {
    No,
    YesButTryNotTo,
    Yes
}

export enum Guardian {
    Father,
    Mother,
    Uncle,
    Aunt,
    GrandFather,
    GrandMother,
    Other
}

export enum Majhab {
    Hanafi,
    Shafi,
    Maleki,
    Hamboli,
    Salafi,
    None
}

export enum AddressType {
    Present,
    Permanent,
    Working,
    Home
}

export enum AccountType {
    Bridegroom,
    Moderator,
    Admin,
    Guardian
}

export enum SubscriptionType {
    Free,
    Premium
}

export enum Relation {
    Son,
    Daughter,
    Nephew,
    Niece,
    GrandSon,
    GrandDaughter,
    Other
}

export enum RequestBiodataType {
    Sent,
    Received
}

export enum RequestBiodataStatus {
    Sent,
    Seen,
    Cancelled,
    Accepted
}

export class BirthDay {
    year: number;
    month: number;
    day: number;

    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
}

export class RangePair {
    min: number;
    max: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }
}