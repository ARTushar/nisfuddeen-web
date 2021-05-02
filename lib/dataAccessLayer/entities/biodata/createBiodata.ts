import Biodata from '../../../models/biodata/Biodata';
import { TransactWriteItem, TransactWriteItemsInput } from '@aws-sdk/client-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import { generatePutTransactItem } from '../../utils/utils';
import { biodataAliases as ba, personalInformationAliases as pia } from '../../utils/aliases';
import {
    generateBiodataGSI1Keys,
    generateBiodataGSI2Keys,
    generateBiodataGSI3KeysFemale,
    generateBiodataGSI3KeysMale,
    generateBiodataGSI4KeysFemale,
    generateBiodataGSI4KeysMale,
    generateBiodataGSI5Keys,
    generateBiodataGSI6Keys,
    generateBiodataPrimaryKeys, generatePIKeys
} from '../../utils/generateKeys';
import EducationQualification from '../../../models/biodata/EducationQualification';

export default function(biodata: Biodata):Promise<Biodata> {
    biodata.createdAt = new Date().toISOString();
    biodata.updatedAt = biodata.createdAt;

    let items: TransactWriteItem[];
    const type = '_tp';
    const permanentAddress = biodata.addresses.find(a => a.type === 'permanent');
    console.assert(permanentAddress !== undefined);

    const keyParams = {
        userId: biodata.userId,
        enabled: biodata.enabled,
        verified: biodata.verified,
        gender: biodata.basicInformation.gender,
        maritalStatus: biodata.basicInformation.maritalStatus,
        pAddress: permanentAddress
    }

    const primaryKeys = generateBiodataPrimaryKeys(biodata.userId);
    const gsi1Keys = generateBiodataGSI1Keys(keyParams);
    const edu: EducationQualification = biodata.educationQualifications.find(e => e.degreeName === 'undergraduate');
    const gsi2Keys = edu? generateBiodataGSI2Keys({
        ...keyParams,
        ugradInstitute: edu.instituteName
    }): undefined;

    const gender = biodata.basicInformation.gender;

    const gsi3Keys = gender === 'male'? generateBiodataGSI3KeysMale({
        ...keyParams,
        prayerTimes: biodata.personaInformation.prayerTimes,
        prayerTimesJamah: biodata.personaInformation.malePrayerTimesInJamah,
        beardStyle: biodata.personaInformation.beardStyle,
        aboveKnee: biodata.personaInformation.pantPajamaAboveKnee,
        outfit: biodata.personaInformation.outfit.join('-')

    }): generateBiodataGSI3KeysFemale({
        ...keyParams,
        prayerTimes: biodata.personaInformation.prayerTimes,
        prayerTimesAwwal: biodata.personaInformation.femalePrayerTimesInAwwal,
        outfit: biodata.personaInformation.outfit.join('-')
    });

    const gsi4Keys = gender === 'male'? generateBiodataGSI4KeysMale({
        ...keyParams,
        occupation: biodata.basicInformation.occupation,
        prayerTimes: biodata.personaInformation.prayerTimes,
        prayerTimesJamah: biodata.personaInformation.malePrayerTimesInJamah,
        beardStyle: biodata.personaInformation.beardStyle,
        aboveKnee: biodata.personaInformation.pantPajamaAboveKnee,
        outfit: biodata.personaInformation.outfit.join('-')
    }): generateBiodataGSI4KeysFemale({
        ...keyParams,
        occupation: biodata.basicInformation.occupation,
        prayerTimes: biodata.personaInformation.prayerTimes,
        prayerTimesAwwal: biodata.personaInformation.femalePrayerTimesInAwwal,
        outfit: biodata.personaInformation.outfit.join('-')
    });

    const gsi5Keys = generateBiodataGSI5Keys({
        ...keyParams,
        occupation: biodata.basicInformation.occupation,
        facialComplexion: biodata.basicInformation.facialColor,
        financialStatus: biodata.familyInformation.financialStatus,
        bDay: biodata.basicInformation.birthDay.toISOString()
    });

    const gsi6Keys = generateBiodataGSI6Keys({
        ...keyParams,
        occupation: biodata.basicInformation.occupation
    });

    const biodataItem: TransactWriteItem = generatePutTransactItem({
        PK: primaryKeys.PK,
        SK: primaryKeys.SK,
        [ba.userId]: biodata.userId,
        [ba.gender]: biodata.basicInformation.gender,
        [ba.country]: permanentAddress.country,
        [ba.district]: permanentAddress.district,
        [ba.enabled]: biodata.enabled,
        [ba.verified]: biodata.verified,
        [ba.birthYear]: biodata.basicInformation.birthDay.year,
        [ba.maritalStatus]: biodata.basicInformation.maritalStatus,
        [ba.occupation]: biodata.basicInformation.occupation,
        [ba.createdAt]: biodata.createdAt,
        [ba.updatedAt]: biodata.updatedAt,
        [type]: "BIODATA",
        GSI1PK: gsi1Keys.GSI1PK,
        GSI1SK: gsi1Keys.GSI1SK,
        GSI2PK: gsi2Keys.GSI2PK,
        GSI2SK: gsi2Keys.GSI2SK,
        GSI3PK: gsi3Keys.GSI3PK,
        GSI3SK: gsi3Keys.GSI3SK,
        GSI4PK: gsi4Keys.GSI4PK,
        GSI4SK: gsi4Keys.GSI4SK,
        GSI5PK: gsi5Keys.GSI5PK,
        GSI5SK: gsi5Keys.GSI5SK,
        GSI6PK: gsi6Keys.GSI6PK,
        GSI6SK: gsi6Keys.GSI6SK,
    });

    const piKeys = generatePIKeys(biodata.userId);

    const piItem: TransactWriteItem = generatePutTransactItem({
        PK: piKeys.PK,
        SK: piKeys.SK,
        [pia.outfit]: biodata.personaInformation.outfit,
        [pia.beardStyle]: biodata.personaInformation.beardStyle,
        [pia.pantPajamaAboveKnee]: biodata.personaInformation.pantPajamaAboveKnee,
        [pia.prayerTimes]: biodata.personaInformation.prayerTimes,
        [pia.malePrayerTimesInJamah]: biodata.personaInformation.malePrayerTimesInJamah,
        [pia.femalePrayerTimesInAwwal]: biodata.personaInformation.femalePrayerTimesInAwwal,
        [pia.durationOfRegularPrayer]: biodata.personaInformation.durationOfRegularPrayer,
        [pia.mahramMaintain]: biodata.personaInformation.mahramMaintain,
        [pia.majhab]: biodata.personaInformation.majhab,
        [pia.politicalPhilosophy]: biodata.personaInformation.politicalPhilosophy,
        [pia.watchDramaMovie]: biodata.personaInformation.watchDramaMovie,
        [pia.readSahihQuran]: biodata.personaInformation.readSahihQuran,
        [pia.listenMusic]: biodata.personaInformation.listenMusic,
        [pia.anyDisease]: biodata.personaInformation.anyDisease,
        [pia.deenMehnat]: biodata.personaInformation.deenMehnat,
        [pia.pirFollower]: biodata.personaInformation.pirFollower,
        [pia.mazarBelief]: biodata.personaInformation.mazarBelief,
        [pia.favoriteIslamicBooks]: biodata.personaInformation.favoriteIslamicBooks,
        [pia.favoriteScholars]: biodata.personaInformation.favoriteScholars,
        [pia.specialQualities]: biodata.personaInformation.specialQualities,
        [pia.guardian]: biodata.personaInformation.guardian,
        [type]: "PERSONALINFORMATION"
    });
}