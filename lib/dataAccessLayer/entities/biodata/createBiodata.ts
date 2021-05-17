import Biodata from '../../../models/biodata/Biodata';
import { TransactWriteItem, TransactWriteItemsCommand, TransactWriteItemsInput } from '@aws-sdk/client-dynamodb';
import {
    generatePutTransactItemRaw,
    generatePutTransactItem,
    generateUpdateTransactWriteItem, generateUpdateAttributes
} from '../../utils/utils';
import {
    biodataAliases as ba,
} from '../../utils/aliases';
import {
    generateADKeys,
    generateBIKeys,
    generateBiodataGSI1Keys,
    generateBiodataGSI2Keys,
    generateBiodataGSI3KeysFemale,
    generateBiodataGSI3KeysMale,
    generateBiodataGSI4KeysFemale,
    generateBiodataGSI4KeysMale,
    generateBiodataGSI5Keys,
    generateBiodataGSI6Keys,
    generateBiodataPrimaryKeys,
    generateCIKeys,
    generateEIKeys,
    generateEQKeys,
    generateFIKeys,
    generateMIKeys,
    generatePIKeys, generatePQKeys, generateUserPrimaryKeys
} from '../../utils/generateKeys';
import EducationQualification from '../../../models/biodata/EducationQualification';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import User from '../../../models/user/User';

export default async function(userId: string, biodata: Biodata): Promise<Biodata> {
    biodata.userId = userId;
    biodata.createdAt = new Date().toISOString();
    biodata.updatedAt = biodata.createdAt;

    let items: TransactWriteItem[] = [];
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
    const gsi2Keys = edu ? generateBiodataGSI2Keys({
        ...keyParams,
        ugradInstitute: edu.instituteName
    }) : undefined;

    const gender = biodata.basicInformation.gender;

    const gsi3Keys = gender === 'male' ? generateBiodataGSI3KeysMale({
        ...keyParams,
        prayerTimes: biodata.personalInformation.prayerTimes,
        prayerTimesJamah: biodata.personalInformation.malePrayerTimesInJamah,
        beardStyle: biodata.personalInformation.beardStyle,
        aboveKnee: biodata.personalInformation.pantPajamaAboveKnee,
        outfit: biodata.personalInformation.outfit

    }) : generateBiodataGSI3KeysFemale({
        ...keyParams,
        prayerTimes: biodata.personalInformation.prayerTimes,
        prayerTimesAwwal: biodata.personalInformation.femalePrayerTimesInAwwal,
        outfit: biodata.personalInformation.outfit
    });

    const gsi4Keys = gender === 'male' ? generateBiodataGSI4KeysMale({
        ...keyParams,
        occupation: biodata.basicInformation.occupation,
        prayerTimes: biodata.personalInformation.prayerTimes,
        prayerTimesJamah: biodata.personalInformation.malePrayerTimesInJamah,
        beardStyle: biodata.personalInformation.beardStyle,
        aboveKnee: biodata.personalInformation.pantPajamaAboveKnee,
        outfit: biodata.personalInformation.outfit
    }) : generateBiodataGSI4KeysFemale({
        ...keyParams,
        occupation: biodata.basicInformation.occupation,
        prayerTimes: biodata.personalInformation.prayerTimes,
        prayerTimesAwwal: biodata.personalInformation.femalePrayerTimesInAwwal,
        outfit: biodata.personalInformation.outfit
    });

    const gsi5Keys = generateBiodataGSI5Keys({
        ...keyParams,
        occupation: biodata.basicInformation.occupation,
        facialColor: biodata.basicInformation.facialColor,
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
        GSI2PK: gsi2Keys?.GSI2PK,
        GSI2SK: gsi2Keys?.GSI2SK,
        GSI3PK: gsi3Keys.GSI3PK,
        GSI3SK: gsi3Keys.GSI3SK,
        GSI4PK: gsi4Keys.GSI4PK,
        GSI4SK: gsi4Keys.GSI4SK,
        GSI5PK: gsi5Keys.GSI5PK,
        GSI5SK: gsi5Keys.GSI5SK,
        GSI6PK: gsi6Keys.GSI6PK,
        GSI6SK: gsi6Keys.GSI6SK,
    });


    let adItems: TransactWriteItem[] = [];
    for (const address of biodata.addresses) {
        adItems.push(generatePutTransactItemRaw(generateADKeys, [biodata.userId, address.type], address, "AD"));
    }


    let eqItems: TransactWriteItem[] = [];
    for (const eq of biodata.educationQualifications) {
        eqItems.push(generatePutTransactItemRaw(generateEQKeys, [biodata.userId, eq.degreeName], eq, "EQ"));
    }

    const biItem: TransactWriteItem = generatePutTransactItemRaw(generateBIKeys, [biodata.userId], biodata.basicInformation, "BI");
    const ciItem = generatePutTransactItemRaw(generateCIKeys, [biodata.userId], biodata.contactInformation, "CI");
    const eiItem: TransactWriteItem = generatePutTransactItemRaw(generateEIKeys, [biodata.userId], biodata.extraInformation, "EI");
    const fiItem: TransactWriteItem = generatePutTransactItemRaw(generateFIKeys, [biodata.userId], biodata.familyInformation, "FI");
    const pqItem: TransactWriteItem = generatePutTransactItemRaw(generatePQKeys, [biodata.userId], biodata.partnerQualities, "PQ");
    const miItem: TransactWriteItem = generatePutTransactItemRaw(generateMIKeys, [biodata.userId], biodata.marriageInformation, "MI");
    const piItem: TransactWriteItem = generatePutTransactItemRaw(generatePIKeys, [biodata.userId], biodata.personalInformation, "PI");

    const userKey = generateUserPrimaryKeys(userId);
    const userUpdateValues = generateUpdateAttributes(
      new User({
          biodataSubmitted: true,
      }));
    const userItem: TransactWriteItem = generateUpdateTransactWriteItem(
      userKey,
      userUpdateValues.updateExpression,
      userUpdateValues.attributeNames,
      userUpdateValues.attributeValues
    )

    items.push(biodataItem, biItem, ciItem, eiItem, fiItem, pqItem, miItem, piItem, ...adItems, ...eqItems, userItem);
    console.assert(items.length <= 25);

    const params: TransactWriteItemsInput = {
        TransactItems: items
    }

    const command = new TransactWriteItemsCommand(params);

    try {
        const response = await dynamoDBClient.send(command);
        console.log(response);
        return biodata;
    } catch (e) {
        console.log(e);
        throw e;
    }
}