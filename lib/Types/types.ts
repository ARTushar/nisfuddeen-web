export enum Gender {
    Male,
    Female
}

export enum MaritalStatus {
    Unmarried,
    MarriedWithChildren,
    MarriedWithoutChildren,
    DivorcedWithChildren,
    DivorcedWithoutChildren,
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

export enum EducationDegree {
    Secondary,
    HigherSecondary,
    Undergraduate,
    Postgraduate,
    Doctorate,
    PostDoctorate
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

export enum MohoranaTimeReply {
    PartiallyDayOfMarriage,
    FullyDayOfMarriage,
    FullyLater,
}

export enum BoyOutfit {
    Panjabi,
    Pajama,
    Pant,
    Shirt,
}

export enum GirlOutfit {
    Abaya,
    Hijab,
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
    TryToAvoid,
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
