import { BoyOutfit, GirlOutfit, Guardian, Majhab, MixAnswer, NegativeAnswer, PositiveAnswer } from '../../Types/types';


export default class PersonalInformation {
    outfit: BoyOutfit[] | GirlOutfit[];
    prayerTimes: number;
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


    constructor(outfit: BoyOutfit[] | GirlOutfit[], prayerTimes: number, durationOfRegularPrayer: number | null, mahramMaintain: MixAnswer, majhab: Majhab, politicalPhylosophy: string, watchDramaMovie: NegativeAnswer, readSahihQuran: PositiveAnswer, listenSong: NegativeAnswer, anyDisease: string, deenMehnat: string, pirFollower: string, mazarBelief: string, favoriteIslamicBooks: string, favoriteScholars: string, specialQualities: string, guardian: Guardian) {
        this.outfit = outfit;
        this.prayerTimes = prayerTimes;
        this.durationOfRegularPrayer = durationOfRegularPrayer;
        this.mahramMaintain = mahramMaintain;
        this.majhab = majhab;
        this.politicalPhilosophy = politicalPhylosophy;
        this.watchDramaMovie = watchDramaMovie;
        this.readSahihQuran = readSahihQuran;
        this.listenSong = listenSong;
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
