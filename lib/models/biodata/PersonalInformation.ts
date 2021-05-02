interface PIConstructorParams {
    outfit: string[]; // BoyOutfit[] | GirlOutfit[];
    beardStyle: string; // BeardStyle
    pantPajamaAboveKnee: boolean;
    prayerTimes: number;
    malePrayerTimesInJamah: number;
    femalePrayerTimesInAwwal: number;
    durationOfRegularPrayer: number;
    mahramMaintain: string; // MixAnswer;
    majhab: string; // Majhab;
    politicalPhilosophy: string;
    watchDramaMovie: string; // NegativeAnswer;
    readSahihQuran: string; // PositiveAnswer;
    listenMusic: string; // NegativeAnswer;
    anyDisease: string;
    deenMehnat: string;
    pirFollower: string;
    mazarBelief: string;
    favoriteIslamicBooks: string;
    favoriteScholars: string;
    specialQualities: string;
    guardian: string; // Guardian;
}

export default class PersonalInformation {
    outfit: string[]; // BoyOutfit[] | GirlOutfit[];
    beardStyle: string; // BeardStyle
    pantPajamaAboveKnee: boolean;
    prayerTimes: number;
    malePrayerTimesInJamah: number;
    femalePrayerTimesInAwwal: number;
    durationOfRegularPrayer: number;
    mahramMaintain: string; // MixAnswer;
    majhab: string; // Majhab;
    politicalPhilosophy: string;
    watchDramaMovie: string; // NegativeAnswer;
    readSahihQuran: string; // PositiveAnswer;
    listenMusic: string; // NegativeAnswer;
    anyDisease: string;
    deenMehnat: string;
    pirFollower: string;
    mazarBelief: string;
    favoriteIslamicBooks: string;
    favoriteScholars: string;
    specialQualities: string;
    guardian: string; // Guardian;


    constructor({outfit, beardStyle, pantPajamaAboveKnee, prayerTimes, malePrayerTimesInJamah, femalePrayerTimesInAwwal, durationOfRegularPrayer, mahramMaintain, majhab, politicalPhilosophy, watchDramaMovie, readSahihQuran, listenMusic, anyDisease, deenMehnat, pirFollower, mazarBelief, favoriteIslamicBooks, favoriteScholars, specialQualities, guardian}: PIConstructorParams) {
        this.outfit = outfit;
        this.beardStyle = beardStyle;
        this.pantPajamaAboveKnee = pantPajamaAboveKnee;
        this.prayerTimes = prayerTimes;
        this.malePrayerTimesInJamah = malePrayerTimesInJamah;
        this.femalePrayerTimesInAwwal = femalePrayerTimesInAwwal;
        this.durationOfRegularPrayer = durationOfRegularPrayer;
        this.mahramMaintain = mahramMaintain;
        this.majhab = majhab;
        this.politicalPhilosophy = politicalPhilosophy;
        this.watchDramaMovie = watchDramaMovie;
        this.readSahihQuran = readSahihQuran;
        this.listenMusic = listenMusic;
        this.anyDisease = anyDisease;
        this.deenMehnat = deenMehnat;
        this.pirFollower = pirFollower;
        this.mazarBelief = mazarBelief;
        this.favoriteIslamicBooks = favoriteIslamicBooks;
        this.favoriteScholars = favoriteScholars;
        this.specialQualities = specialQualities;
        this.guardian = guardian;
    }
}
