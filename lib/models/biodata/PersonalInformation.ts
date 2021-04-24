import {
    BeardStyle,
    BoyOutfit,
    GirlOutfit,
    Guardian,
    Majhab,
    MixAnswer,
    NegativeAnswer,
    PositiveAnswer
} from '../../Types/types';


interface PIConstructorParams {
    outfit: BoyOutfit[] | GirlOutfit[];
    beardStyle?: BeardStyle | null;
    pantPajamaAboveKnee?: boolean | null;
    prayerTimes: number;
    malePrayerTimesInJamah: number | null;
    femalePrayerTimesInAwwal: number | null;
    durationOfRegularPrayer?: number | null;
    mahramMaintain: MixAnswer;
    majhab: Majhab;
    politicalPhylosophy: string;
    watchDramaMovie: NegativeAnswer;
    readSahihQuran: PositiveAnswer;
    listenMusic: NegativeAnswer;
    anyDisease: string;
    deenMehnat: string;
    pirFollower: string;
    mazarBelief: string;
    favoriteIslamicBooks: string;
    favoriteScholars: string;
    specialQualities: string;
    guardian: Guardian;
}

export default class PersonalInformation {
    outfit: BoyOutfit[] | GirlOutfit[];
    beardStyle: BeardStyle | null
    pantPajamaAboveKnee: boolean | null;
    prayerTimes: number;
    malePrayerTimesInJamah: number | null;
    femalePrayerTimesInAwwal: number | null;
    durationOfRegularPrayer: number | null;
    mahramMaintain: MixAnswer;
    majhab: Majhab;
    politicalPhilosophy: string;
    watchDramaMovie: NegativeAnswer;
    readSahihQuran: PositiveAnswer;
    listenSong: NegativeAnswer;
    anyDisease: string;
    deenMehnat: string;
    pirFollower: string;
    mazarBelief: string;
    favoriteIslamicBooks: string;
    favoriteScholars: string;
    specialQualities: string;
    guardian: Guardian;


    constructor({outfit, beardStyle=null, pantPajamaAboveKnee=null, prayerTimes, malePrayerTimesInJamah=null, femalePrayerTimesInAwwal=null, durationOfRegularPrayer=null, mahramMaintain, majhab, politicalPhylosophy, watchDramaMovie, readSahihQuran, listenMusic, anyDisease, deenMehnat, pirFollower, mazarBelief, favoriteIslamicBooks, favoriteScholars, specialQualities, guardian}: PIConstructorParams) {
        this.outfit = outfit;
        this.beardStyle = beardStyle;
        this.pantPajamaAboveKnee = pantPajamaAboveKnee;
        this.prayerTimes = prayerTimes;
        this.malePrayerTimesInJamah = malePrayerTimesInJamah;
        this.femalePrayerTimesInAwwal = femalePrayerTimesInAwwal;
        this.durationOfRegularPrayer = durationOfRegularPrayer;
        this.mahramMaintain = mahramMaintain;
        this.majhab = majhab;
        this.politicalPhilosophy = politicalPhylosophy;
        this.watchDramaMovie = watchDramaMovie;
        this.readSahihQuran = readSahihQuran;
        this.listenSong = listenMusic;
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
