import Biodata from '../../../models/biodata/Biodata';
import { TransactWriteItem, TransactWriteItemsCommand, TransactWriteItemsInput } from '@aws-sdk/client-dynamodb';
import {
    generatePutTransactItemRaw, generateUpdateAttributes,
    generateUpdateTransactWriteItem
} from '../../utils/utils';
import {
    biodataAliases,
} from '../../utils/aliases';
import {
    biodataGsi1args,
    biodataGsi2args,
    biodataGsi3argsFemale,
    biodataGsi3argsMale,
    biodataGsi4argsFemale,
    biodataGsi4argsMale, biodataGsi5args, biodataGsi6args,
    commonBiodataGlobalArgs,
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
    generatePIKeys,
    generatePQKeys,
} from '../../utils/generateKeys';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { debug } from '../../../utils/helpers';
import { getBiodataByUserId } from './getBiodata';
import { getKeys } from '../../../scripts/utils/utils';
import Address from '../../../models/biodata/Address';
import ShortBiodata from '../../../models/biodata/ShortBiodata';
import { createBadRequestError } from '../../../utils/errorCreators';

const debugType: string = 'biodata_update';

export default async function(userId, newBiodata: Biodata, gender: string): Promise<Biodata> {
    debug(debugType, newBiodata);
    console.assert(userId !== undefined);

    newBiodata.updatedAt = new Date().toISOString();
    let items: TransactWriteItem[] = [];
    let oldBiodata: Biodata;
    try {
        oldBiodata = await getBiodataByUserId(userId);
    } catch (e) {
        throw e;
    }

    debug("oldbiodata", oldBiodata);

    items = generateTransactItems(newBiodata, oldBiodata, gender);
    if(items.length == 0) {
        throw createBadRequestError('No field to update');
    }

    console.assert(items.length <= 25);

    const params: TransactWriteItemsInput = {
        TransactItems: items
    }
    debug("params", JSON.stringify(params, null, 2));

    const command = new TransactWriteItemsCommand(params);

    try {
        const response = await dynamoDBClient.send(command);
        console.log(response);
        return newBiodata;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

// TODO: add a validation layer after access control layer.
//  Assume required inputs are sent over the input


// function generateUpdateAttributes(obj) {
//     let attributeNames = {};
//     let attributeValues = {};
//     let updateExpression = 'set ';
//     const aliasObj = obj.mapToAlias();
//     let updated = false;
//
//     for(const key of getKeys(aliasObj)) {
//         // if(key === "id" || key === 'createdAt') continue;
//         debug("generate update attributes_"+key, aliasObj[key]);
//         if(aliasObj[key] !== undefined){
//             const av = ':' + key;
//             const an = '#' + key;
//             attributeValues[av] = aliasObj[key];
//             attributeNames[an] = key;
//             updateExpression += `${an} = ${av}, `
//             updated = true
//         }
//     }
//     updateExpression = updateExpression.substr(0, updateExpression.length-2)
//     return {updated, updateExpression, attributeNames, attributeValues};
// }

function generateTransactItems(newBiodata: Biodata, oldBiodata: Biodata, gender: string) {
    let items: TransactWriteItem[] = [];

    function addUpdateItem(obj, keyGenerator ) {
        const vals = generateUpdateAttributes(obj);
        if(vals.updated) {
            const key = keyGenerator(oldBiodata.userId);
            items.push(generateUpdateTransactWriteItem(key, vals.updateExpression, vals.attributeNames, vals.attributeValues));
        }
    }


    if(newBiodata.addresses) {
        for(const ad of newBiodata.addresses) {
            const vals = generateUpdateAttributes(ad);
            if(vals.updated) {
                const key = generateADKeys(oldBiodata.userId, ad.type);
                items.push(generateUpdateTransactWriteItem(key, vals.updateExpression, vals.attributeNames, vals.attributeValues));
            }
        }
    }

    if(newBiodata.educationQualifications) {
        for(const eq of newBiodata.educationQualifications) {
            const existedEq = oldBiodata.educationQualifications.find(e => e.degreeName === eq.degreeName);
            if(existedEq) {
                const vals = generateUpdateAttributes(eq);
                if(vals.updated) {
                    const key = generateEQKeys(oldBiodata.userId, eq.degreeName);
                    items.push(generateUpdateTransactWriteItem(key, vals.updateExpression, vals.attributeNames, vals.attributeValues));
                }
            } else {
                items.push(generatePutTransactItemRaw(generateEQKeys, [oldBiodata.userId, eq.degreeName], eq, "EQ"))
            }
        }
    }

    if(newBiodata.basicInformation) {
        addUpdateItem(newBiodata.basicInformation, generateBIKeys);
    }

    if(newBiodata.personaInformation) {
        addUpdateItem(newBiodata.personaInformation, generatePIKeys);
    }

    if(newBiodata.partnerQualities) {
        addUpdateItem(newBiodata.partnerQualities, generatePQKeys);
    }

    if(newBiodata.marriageInformation) {
        addUpdateItem(newBiodata.marriageInformation, generateMIKeys);
    }

    if(newBiodata.familyInformation) {
        addUpdateItem(newBiodata.familyInformation, generateFIKeys);
    }

    if(newBiodata.contactInformation) {
        addUpdateItem(newBiodata.contactInformation, generateCIKeys);
    }

    if(newBiodata.extraInformation) {
        addUpdateItem(newBiodata.extraInformation, generateEIKeys);
    }

    const primaryKey = generateBiodataPrimaryKeys(oldBiodata.userId);
    const coreValues = generateUpdateAttributesForCoreFields(newBiodata, oldBiodata, gender);
    items.push(generateUpdateTransactWriteItem(primaryKey, coreValues.updateExpression, coreValues.attributeNames, coreValues.attributeValues));

    return items;
}


function generateUpdateAttributesForCoreFields(newBiodata: Biodata, oldBiodata: Biodata, gender: string) {
    let attributeNames = {};
    let attributeValues = {};
    let updateExpression = 'set ';

    function updateValuesGsi(keys, pk, sk) {
        const valp = ":"+pk;
        const vals = ":"+sk;
        const valnp = "#"+pk;
        const valns = "#"+sk;
        attributeValues[valp] = keys[pk];
        attributeValues[vals] = keys[sk];
        attributeNames[valnp] = pk;
        attributeNames[valns] = sk;
        updateExpression += `${valnp} = ${valp}, ${valns} = ${vals}, `;
    }
    const shortBiodata = generateShortBiodataFromBiodata(newBiodata);
    for(const key of getKeys(shortBiodata)) {
        if(typeof shortBiodata[key] !== 'object' && shortBiodata[key] !== undefined) {
            const alias = biodataAliases[key];
            const av = ':' + alias;
            const an = '#' + alias;
            attributeValues[av] = shortBiodata[key];
            attributeNames[an] = alias;
            updateExpression += `${an} = ${av}, `
        }
    }

    const gsi = updatedIndexes(newBiodata, gender);
    if(gsi.GSI1) {
        const keys = generateGsi1Key(newBiodata, oldBiodata);
        updateValuesGsi(keys, 'GSI1PK', 'GSI1SK');
    }
    if(gsi.GSI2) {
        const keys = generateGsi2Key(newBiodata, oldBiodata);
        updateValuesGsi(keys, 'GSI2PK', 'GSI2SK');
    }
    if(gsi.GSI3) {
        const keys = gender === 'male'? generateGsi3KeyMale(newBiodata, oldBiodata): generateGsi3KeyFemale(newBiodata, oldBiodata);
        updateValuesGsi(keys, 'GSI3PK', 'GSI3SK');
    }
    if(gsi.GSI4) {
        const keys = gender === 'male'? generateGsi4KeyMale(newBiodata, oldBiodata): generateGsi4KeyFemale(newBiodata, oldBiodata);
        updateValuesGsi(keys, 'GSI4PK', 'GSI4SK');
    }
    if(gsi.GSI5) {
        const keys = generateGsi5Key(newBiodata, oldBiodata);
        updateValuesGsi(keys, 'GSI5PK', 'GSI5SK');
    }
    if(gsi.GSI6) {
        const keys = generateGsi6Key(newBiodata, oldBiodata);
        updateValuesGsi(keys, 'GSI6PK', 'GSI6SK');
    }

    debug("update_expression", updateExpression);
    updateExpression = updateExpression.substr(0, updateExpression.length-2)
    return {updateExpression, attributeNames, attributeValues};
}

function updatedIndexes(newBiodata: Biodata, gender: string) {
    let indexes = {
        GSI1: false,
        GSI2: false,
        GSI3: false,
        GSI4: false,
        GSI5: false,
        GSI6: false,
    }
    function setIndexes(obj) {
        console.assert(typeof obj === 'object');
        const aliasedObj = obj.mapToAlias();
        for(const key of getKeys(aliasedObj)) {
            if(typeof aliasedObj[key] === 'object' && aliasedObj[key].length === undefined) setIndexes(aliasedObj[key]);
            else if(aliasedObj[key] !== undefined) {
                determineGlobalIndexUpdates(key, indexes, gender);
            }
        }
    }

    for(const key of getKeys(newBiodata)) {
        if(typeof newBiodata[key] === 'object' && newBiodata[key].length === undefined) setIndexes(newBiodata[key]);
        else if(key === 'addresses') {
            const permanent = newBiodata[key]?.find(a => a.type === 'permanent')
            if(permanent) setIndexes(permanent);
        } else if(key === 'educationQualifications') {
            const ugrad = newBiodata[key]?.find(a => a.degreeName === 'undergraduate')
            if(ugrad) setIndexes(ugrad);
        }
        else if(newBiodata[key] !== undefined){
            determineGlobalIndexUpdates(key, indexes, gender);
        }
    }
    return indexes;
}

function determineGlobalIndexUpdates(field, needToUpdateGSIs, gender) {
    if(commonBiodataGlobalArgs.includes(field)) {
        needToUpdateGSIs['GSI1'] = true;
        needToUpdateGSIs['GSI2'] = true;
        needToUpdateGSIs['GSI3'] = true;
        needToUpdateGSIs['GSI4'] = true;
        needToUpdateGSIs['GSI5'] = true;
        needToUpdateGSIs['GSI6'] = true;
    }
    else {
        if (biodataGsi1args.includes(field)) {
            needToUpdateGSIs['GSI1'] = true;
        }
        if(biodataGsi2args.includes(field)) {
            needToUpdateGSIs['GSI2'] = true;
        }
        if(gender === 'male' && biodataGsi3argsMale.includes(field) ||
          gender === 'female' && biodataGsi3argsFemale.includes(field) ) {
            needToUpdateGSIs['GSI3'] = true;
        }
        if(gender === 'male' && biodataGsi4argsMale.includes(field) ||
          gender === 'female' && biodataGsi4argsFemale.includes(field) ) {
            needToUpdateGSIs['GSI4'] = true;
        }
        if (biodataGsi5args.includes(field)) {
            needToUpdateGSIs['GSI5'] = true;
        }
        if(biodataGsi6args.includes(field)) {
            needToUpdateGSIs['GSI6'] = true;
        }
    }
}

function getDefinedValue(a, b) {
    return a === undefined? b: a;
}
function mergeObjs(newObj, oldObj) {
    for(const key of getKeys(oldObj)) {
        if(newObj[key] === undefined) {
            newObj[key] = oldObj[key];
        }
    }
}

function generateGsi1Key(newBiodata:Biodata, oldBiodata: Biodata) {
    let newPermanent = newBiodata.addresses?.find(a => a.type === 'permanent')
    if(!newPermanent) newPermanent = new Address({type: 'permanent'});
    const oldPermanent = oldBiodata.addresses?.find(a => a.type === 'permanent')
    mergeObjs(newPermanent, oldPermanent);


    return generateBiodataGSI1Keys({
        userId: oldBiodata.userId,
        enabled: getDefinedValue(newBiodata.enabled, oldBiodata.enabled),
        verified: getDefinedValue(newBiodata.verified, oldBiodata.verified),
        gender: getDefinedValue(newBiodata?.basicInformation?.gender, oldBiodata?.basicInformation?.gender),
        maritalStatus: getDefinedValue(newBiodata?.basicInformation?.maritalStatus, oldBiodata?.basicInformation?.maritalStatus),
        pAddress: newPermanent
    })
}
function generateGsi2Key(newBiodata:Biodata, oldBiodata: Biodata) {
    let newPermanent = newBiodata.addresses?.find(a => a.type === 'permanent')
    if(!newPermanent) newPermanent = new Address({type: 'permanent'});
    const oldPermanent = oldBiodata.addresses?.find(a => a.type === 'permanent')
    mergeObjs(newPermanent, oldPermanent);

    const newUgrad = newBiodata.educationQualifications?.find(a => a.degreeName === 'undergraduate')
    const oldUgrad = newBiodata.educationQualifications?.find(a => a.degreeName === 'undergraduate')

    return generateBiodataGSI2Keys({
        userId: oldBiodata.userId,
        enabled: getDefinedValue(newBiodata.enabled, oldBiodata.enabled),
        verified: getDefinedValue(newBiodata.verified, oldBiodata.verified),
        gender: getDefinedValue(newBiodata?.basicInformation?.gender, oldBiodata?.basicInformation?.gender),
        maritalStatus: getDefinedValue(newBiodata?.basicInformation?.maritalStatus, oldBiodata?.basicInformation?.maritalStatus),
        pAddress: newPermanent,
        ugradInstitute: getDefinedValue(newUgrad?.instituteName, oldUgrad?.instituteName)
    })
}
function generateGsi3KeyMale(newBiodata:Biodata, oldBiodata: Biodata) {
    let newPermanent = newBiodata.addresses?.find(a => a.type === 'permanent')
    if(!newPermanent) newPermanent = new Address({type: 'permanent'});
    const oldPermanent = oldBiodata.addresses?.find(a => a.type === 'permanent')
    mergeObjs(newPermanent, oldPermanent);


    return generateBiodataGSI3KeysMale({
        userId: oldBiodata.userId,
        enabled: getDefinedValue(newBiodata?.enabled, oldBiodata?.enabled),
        verified: getDefinedValue(newBiodata?.verified, oldBiodata?.verified),
        gender: getDefinedValue(newBiodata?.basicInformation?.gender, oldBiodata?.basicInformation?.gender),
        maritalStatus: getDefinedValue(newBiodata?.basicInformation?.maritalStatus, oldBiodata?.basicInformation?.maritalStatus),
        pAddress: newPermanent,
        prayerTimes: getDefinedValue(newBiodata?.personaInformation?.prayerTimes, oldBiodata?.personaInformation?.prayerTimes),
        prayerTimesJamah: getDefinedValue(newBiodata?.personaInformation?.malePrayerTimesInJamah, oldBiodata?.personaInformation?.malePrayerTimesInJamah),
        beardStyle: getDefinedValue(newBiodata?.personaInformation?.beardStyle, oldBiodata?.personaInformation?.beardStyle),
        aboveKnee: getDefinedValue(newBiodata?.personaInformation?.pantPajamaAboveKnee, oldBiodata?.personaInformation?.pantPajamaAboveKnee),
        outfit: getDefinedValue(newBiodata?.personaInformation?.outfit, oldBiodata?.personaInformation?.outfit)
    })
}
function generateGsi3KeyFemale(newBiodata:Biodata, oldBiodata: Biodata) {
    let newPermanent = newBiodata.addresses?.find(a => a.type === 'permanent')
    if(!newPermanent) newPermanent = new Address({type: 'permanent'});
    const oldPermanent = oldBiodata.addresses?.find(a => a.type === 'permanent')
    mergeObjs(newPermanent, oldPermanent);


    return generateBiodataGSI3KeysFemale({
        userId: oldBiodata.userId,
        enabled: getDefinedValue(newBiodata?.enabled, oldBiodata?.enabled),
        verified: getDefinedValue(newBiodata?.verified, oldBiodata?.verified),
        gender: getDefinedValue(newBiodata?.basicInformation?.gender, oldBiodata?.basicInformation?.gender),
        maritalStatus: getDefinedValue(newBiodata?.basicInformation?.maritalStatus, oldBiodata?.basicInformation?.maritalStatus),
        pAddress: newPermanent,
        prayerTimes: getDefinedValue(newBiodata?.personaInformation?.prayerTimes, oldBiodata?.personaInformation?.prayerTimes),
        prayerTimesAwwal: getDefinedValue(newBiodata?.personaInformation?.femalePrayerTimesInAwwal, oldBiodata?.personaInformation?.femalePrayerTimesInAwwal),
        outfit: getDefinedValue(newBiodata?.personaInformation?.outfit, oldBiodata?.personaInformation?.outfit)
    })
}
function generateGsi4KeyMale(newBiodata:Biodata, oldBiodata: Biodata) {
    const newPermanent = newBiodata.addresses?.find(a => a.type === 'permanent')
    const oldPermanent = oldBiodata.addresses?.find(a => a.type === 'permanent')
    mergeObjs(newPermanent, oldPermanent);


    return generateBiodataGSI4KeysMale({
        userId: oldBiodata.userId,
        enabled: getDefinedValue(newBiodata?.enabled, oldBiodata?.enabled),
        verified: getDefinedValue(newBiodata?.verified, oldBiodata?.verified),
        gender: getDefinedValue(newBiodata?.basicInformation?.gender, oldBiodata?.basicInformation?.gender),
        maritalStatus: getDefinedValue(newBiodata?.basicInformation?.maritalStatus, oldBiodata?.basicInformation?.maritalStatus),
        pAddress: newPermanent,
        prayerTimes: getDefinedValue(newBiodata?.personaInformation?.prayerTimes, oldBiodata?.personaInformation?.prayerTimes),
        prayerTimesJamah: getDefinedValue(newBiodata?.personaInformation?.malePrayerTimesInJamah, oldBiodata?.personaInformation?.malePrayerTimesInJamah),
        beardStyle: getDefinedValue(newBiodata?.personaInformation?.beardStyle, oldBiodata?.personaInformation?.beardStyle),
        aboveKnee: getDefinedValue(newBiodata?.personaInformation?.pantPajamaAboveKnee, oldBiodata?.personaInformation?.pantPajamaAboveKnee),
        outfit: getDefinedValue(newBiodata?.personaInformation?.outfit, oldBiodata?.personaInformation?.outfit),
        occupation: getDefinedValue(newBiodata?.basicInformation?.occupation, oldBiodata?.basicInformation?.occupation)
    })
}
function generateGsi4KeyFemale(newBiodata:Biodata, oldBiodata: Biodata) {
    let newPermanent = newBiodata.addresses?.find(a => a.type === 'permanent')
    if(!newPermanent) newPermanent = new Address({type: 'permanent'});
    const oldPermanent = oldBiodata.addresses?.find(a => a.type === 'permanent')
    mergeObjs(newPermanent, oldPermanent);


    return generateBiodataGSI4KeysFemale({
        userId: oldBiodata.userId,
        enabled: getDefinedValue(newBiodata?.enabled, oldBiodata?.enabled),
        verified: getDefinedValue(newBiodata?.verified, oldBiodata?.verified),
        gender: getDefinedValue(newBiodata?.basicInformation?.gender, oldBiodata?.basicInformation?.gender),
        maritalStatus: getDefinedValue(newBiodata?.basicInformation?.maritalStatus, oldBiodata?.basicInformation?.maritalStatus),
        pAddress: newPermanent,
        prayerTimes: getDefinedValue(newBiodata?.personaInformation?.prayerTimes, oldBiodata?.personaInformation?.prayerTimes),
        prayerTimesAwwal: getDefinedValue(newBiodata?.personaInformation?.femalePrayerTimesInAwwal, oldBiodata?.personaInformation?.femalePrayerTimesInAwwal),
        occupation: getDefinedValue(newBiodata?.basicInformation?.occupation, oldBiodata?.basicInformation?.occupation),
        outfit: getDefinedValue(newBiodata?.personaInformation?.outfit, oldBiodata?.personaInformation?.outfit)
    })
}
function generateGsi5Key(newBiodata:Biodata, oldBiodata: Biodata) {
    let newPermanent = newBiodata.addresses?.find(a => a.type === 'permanent')
    if(!newPermanent) newPermanent = new Address({type: 'permanent'});
    const oldPermanent = oldBiodata.addresses?.find(a => a.type === 'permanent')
    mergeObjs(newPermanent, oldPermanent);


    return generateBiodataGSI5Keys({
        userId: oldBiodata.userId,
        enabled: getDefinedValue(newBiodata.enabled, oldBiodata.enabled),
        verified: getDefinedValue(newBiodata.verified, oldBiodata.verified),
        gender: getDefinedValue(newBiodata.basicInformation?.gender, oldBiodata.basicInformation?.gender),
        maritalStatus: getDefinedValue(newBiodata.basicInformation?.maritalStatus, oldBiodata.basicInformation?.maritalStatus),
        pAddress: newPermanent,
        occupation: getDefinedValue(newBiodata.basicInformation?.occupation, oldBiodata.basicInformation?.occupation),
        facialColor: getDefinedValue(newBiodata.basicInformation?.facialColor, oldBiodata.basicInformation?.facialColor),
        financialStatus: getDefinedValue(newBiodata.familyInformation?.financialStatus, newBiodata.familyInformation?.financialStatus),
        bDay: getDefinedValue(newBiodata.basicInformation?.birthDay?.toISOString(), oldBiodata.basicInformation?.birthDay?.toISOString())
    })
}
function generateGsi6Key(newBiodata:Biodata, oldBiodata: Biodata) {
    let newPermanent = newBiodata.addresses?.find(a => a.type === 'permanent')
    if(!newPermanent) newPermanent = new Address({type: 'permanent'});
    const oldPermanent = oldBiodata.addresses?.find(a => a.type === 'permanent')
    mergeObjs(newPermanent, oldPermanent);


    return generateBiodataGSI6Keys({
        userId: oldBiodata.userId,
        enabled: getDefinedValue(newBiodata.enabled, oldBiodata.enabled),
        verified: getDefinedValue(newBiodata.verified, oldBiodata.verified),
        gender: getDefinedValue(newBiodata?.basicInformation?.gender, oldBiodata?.basicInformation?.gender),
        maritalStatus: getDefinedValue(newBiodata?.basicInformation?.maritalStatus, oldBiodata?.basicInformation?.maritalStatus),
        occupation: getDefinedValue(newBiodata?.basicInformation?.occupation, oldBiodata?.basicInformation?.occupation),
        pAddress: newPermanent
    })
}

function generateShortBiodataFromBiodata(newBiodata: Biodata): ShortBiodata{
    const pAddress = newBiodata.addresses?.find(a => a.type === 'permanent');
    return new ShortBiodata({
        enabled: newBiodata.enabled,
        verified: newBiodata.enabled,
        country: pAddress?.country,
        district: pAddress?.district,
        maritalStatus: newBiodata.basicInformation?.maritalStatus,
        birthYear: newBiodata.basicInformation?.birthDay?.year,
        occupation: newBiodata.basicInformation?.occupation,
        updatedAt: newBiodata.updatedAt
    });
}