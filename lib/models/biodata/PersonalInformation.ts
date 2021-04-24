export enum BoyOutfit {
    Panjabi,
    Pant,
    Shirt,
}

export enum GirlOutfit {
    SelwarKamij,
    Hijab,
    WesternDress,
    Scarf,
    Pant,
    Shirt,
    Shari,
    Burqa,
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
    Other
}


export default class PersonalInformation {
    outfit: BoyOutfit[] | GirlOutfit[];
    prayerTimes: number;
    durationOfRegularPrayer: number | null;
    mahramMaintan: MixAnswer;
    majhab: Majhab;
    politicalPhylosophy: string;
    watchDramaMovie: NegativeAnswer;
    readSahihQuran: PositiveAnswer;
    listenSong: NegativeAnswer;
    anyDisease: string;
    deenMehnat: string;
    pirFollower: string;
    mazarBelief: string;
    favoriteIslmicBooks: string;
    favoriteScholars: string;
    specialQualities: string;
    guardian: Guardian

    constructor(outfit, prayerTimes, durationOfRegularPrayer = null, mahramMaintain, majhab,
        politicalPhylosophy, watchDramaMovie, readSahihQuran, listenSong, anyDis
        ) {
        
    }
}