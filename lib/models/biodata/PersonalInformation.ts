enum BoyOutfit {
    PanjabiPajama,
    PanjabiPant,
    ShirtPant,
}

enum GirlOutfit {
    SelwarKamijVeil,
    SelwarKamijNoVeil,
    SelwarKamijHijab,
    WesternDressHijab,
    WesternDressNoVeil,
    Shari,
    BurqaHijab,
    BurqaNiqab,
    BurqaNiqabHandSocks,
    BurqaNiqabHandFeetSocks,
    BurqaNiqabFeetSocks,
}

enum Answer {
    Yes,
    YesButTryNotTo,
    No,
    NoButTryTo,
    Almost,
    Somewhat
}

export class PersonalInformation {
    outfit: string;
    prayerTimes: number;
    durationOfRegularPrayer: number;
    mahramMaintan: Answer;
    majhab: string;
    politicalPhylisophy: string;
    watchDramaMovie: Answer;
    readSahihQuran: Answer;
    listenSong: Answer;
    anyDisease: string;
    deenMehnat: string;
    pirFollower: Answer;
    majharBelief: string;
    favoriteIslmicBooks: string;
    favoriteScholrs: string;
}