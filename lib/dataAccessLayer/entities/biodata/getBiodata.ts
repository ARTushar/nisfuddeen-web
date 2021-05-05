import {
    generateBiodataGSI1Keys,
    generateBiodataGSI2Keys,
    generateBiodataGSI3KeysFemale,
    generateBiodataGSI3KeysMale,
    generateBiodataGSI4KeysFemale,
    generateBiodataGSI4KeysMale,
    generateBiodataGSI5Keys,
    generateBiodataGSI6Keys,
    generateBiodataPrimaryKeys
} from '../../utils/generateKeys';
import { QueryCommand, QueryCommandInput, QueryCommandOutput } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import Biodata from '../../../models/biodata/Biodata';
import Address from '../../../models/biodata/Address';
import ShortBiodata from '../../../models/biodata/ShortBiodata';
import moment from 'moment';

export async function getBiodataByUserId(userId: string) {
    const primaryKeys = generateBiodataPrimaryKeys(userId);
    const params: QueryCommandInput = {
        KeyConditionExpression: '#pk = :pk AND begins_with(#sk, :sk)',
        ExpressionAttributeNames: {
            "#pk": "PK",
            "#sk": "SK"
        },
        ExpressionAttributeValues: marshall({
            ":pk": primaryKeys.PK,
            ":sk": primaryKeys.SK,
        }),
        // ProjectionExpression: '', // TODO: add required attributes
        TableName: DynamodbConfig.tableName
    }

    const command = new QueryCommand(params);
    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command)
        if (response.Items.length >= 1) {
            return Biodata.mapFromAlias(response.Items);
        }
        return null;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

interface BiodatasByGnMsLoc {
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string;
    pAddress: Address;
    limit?: number;
    lastEvaluatedKey?: any;
}

export async function getBiodatasByGnMsLoc({enabled, verified, gender, maritalStatus, pAddress, limit=1000, lastEvaluatedKey=undefined}: BiodatasByGnMsLoc) {
    console.assert( enabled !== undefined && verified !== undefined && gender && maritalStatus && pAddress?.country !== undefined);
    let userId = undefined;
    const PK = generateBiodataGSI1Keys({
        userId, enabled, verified, gender, maritalStatus, pAddress
    }).GSI1PK;
    const SK = generateQuerySK(pAddress, false);
    const keyExpression = '#pk = :pk' + (SK !== '' ? ' AND begins_with(#sk, :sk)': '');
    // console.log("expression: ", keyExpression);
    const params = generateParams(keyExpression, 'GSI1PK', 'GSI1SK', PK, SK, 'GSI1', limit, lastEvaluatedKey);
    try {
        return performQuery(params);
    } catch (e) {
        throw e;
    }
}

interface BiodatasByGnMsUgLoc {
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string;
    ugradInstitute: string;
    pAddress: Address;
    limit?: number;
    lastEvaluatedKey?: any;
}

export async function getBiodatasByGnMsUgLoc({enabled, verified, gender, maritalStatus, ugradInstitute, pAddress, limit=1000, lastEvaluatedKey=undefined}: BiodatasByGnMsUgLoc) {
    console.assert( enabled !== undefined && verified !== undefined && gender && maritalStatus && ugradInstitute);
    let userId = undefined;
    const PK = generateBiodataGSI2Keys({
        userId, enabled, verified, gender, maritalStatus, ugradInstitute, pAddress
    }).GSI2PK;
    const SK = generateQuerySK(pAddress, true);
    console.log(PK, SK);
    const keyExpression = '#pk = :pk' + (SK !== '' ? ' AND begins_with(#sk, :sk)': '');
    // console.log("expression: ", keyExpression);
    const params = generateParams(keyExpression, 'GSI2PK', 'GSI2SK', PK, SK, 'GSI2', limit, lastEvaluatedKey);
    try {
        return performQuery(params);
    } catch (e) {
        throw e;
    }
}

interface BiodatasByGnMsLocRel {
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string;
    prayerTimes: number;
    prayerTimesJamah?: number;
    prayerTimesAwwal?: number;
    aboveKnee?: boolean;
    beardStyle?: string;
    outfit: string[];
    pAddress: Address;
    limit?: number;
    lastEvaluatedKey?: any;
}

export async function getBiodatasByGnMsLocRel({enabled, verified, gender, maritalStatus, prayerTimes, prayerTimesJamah, prayerTimesAwwal, aboveKnee, beardStyle, outfit, pAddress, limit=1000, lastEvaluatedKey=undefined}: BiodatasByGnMsLocRel) {
    console.assert( enabled !== undefined && verified !== undefined && gender && maritalStatus && prayerTimes !== undefined &&  pAddress?.country !== undefined);
    let PK, SK;
    if(gender === 'male') {
        console.assert(prayerTimesJamah !== undefined && aboveKnee !== undefined && beardStyle)
        let userId = undefined;
        PK = generateBiodataGSI3KeysMale({
            userId, enabled, verified, gender, maritalStatus, prayerTimes, prayerTimesJamah, outfit, beardStyle, aboveKnee, pAddress
        }).GSI3PK;
    } else {
        console.assert( prayerTimesAwwal !== undefined);
        let userId = undefined;
        PK = generateBiodataGSI3KeysFemale({
            userId, enabled, verified, gender, maritalStatus, prayerTimes, prayerTimesAwwal, outfit, pAddress
        }).GSI3PK;
    }
    SK = generateQuerySK(pAddress, false);
    const keyExpression = '#pk = :pk' + (SK !== '' ? ' AND begins_with(#sk, :sk)': '');
    // console.log("expression: ", keyExpression);
    const params = generateParams(keyExpression, 'GSI3PK', 'GSI3SK', PK, SK, 'GSI3', limit, lastEvaluatedKey);
    try {
        return performQuery(params);
    } catch (e) {
        throw e;
    }
}
interface BiodatasByGnMsLocRelOc {
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string;
    prayerTimes: number;
    prayerTimesJamah?: number;
    prayerTimesAwwal?: number;
    aboveKnee?: boolean;
    beardStyle?: string;
    outfit: string[];
    occupation: string,
    pAddress: Address;
    limit?: number;
    lastEvaluatedKey?: any;
}

export async function getBiodatasByGnMsLocRelOc({enabled, verified, gender, maritalStatus, prayerTimes, prayerTimesJamah, prayerTimesAwwal, aboveKnee, beardStyle, outfit, occupation, pAddress, limit=1000, lastEvaluatedKey=undefined}: BiodatasByGnMsLocRelOc) {
    console.assert( enabled !== undefined && verified !== undefined && gender && maritalStatus && prayerTimes !== undefined && occupation &&  pAddress?.country !== undefined);
    let PK, SK;
    if(gender === 'male') {
        console.assert(prayerTimesJamah !== undefined && aboveKnee !== undefined && beardStyle)
        let userId = undefined;
        PK = generateBiodataGSI4KeysMale({
            userId, enabled, verified, gender, maritalStatus, prayerTimes, prayerTimesJamah, outfit, beardStyle, aboveKnee, occupation, pAddress
        }).GSI4PK;
    } else {
        console.assert( prayerTimesAwwal !== undefined);
        let userId = undefined;
        PK = generateBiodataGSI4KeysFemale({
            userId, enabled, verified, gender, maritalStatus, prayerTimes, prayerTimesAwwal, outfit, occupation, pAddress
        }).GSI4PK;
    }
    SK = generateQuerySK(pAddress, false);
    const keyExpression = '#pk = :pk' + (SK !== '' ? ' AND begins_with(#sk, :sk)': '');
    // console.log("expression: ", keyExpression);
    const params = generateParams(keyExpression, 'GSI4PK', 'GSI4SK', PK, SK, 'GSI4', limit, lastEvaluatedKey);
    try {
        return performQuery(params);
    } catch (e) {
        throw e;
    }
}

interface BiodatasByGnMsLocOcFcFsBd {
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string;
    occupation: string;
    facialComplexion: string;
    financialStatus: string;
    minAge: number;
    maxAge: number;
    pAddress: Address;
    limit?: number;
    lastEvaluatedKey?: any;
}

export async function getBiodatasByGnMsLocOcFcFsBd({enabled, verified, gender, maritalStatus, occupation, facialComplexion, financialStatus, minAge, maxAge, pAddress, limit=1000, lastEvaluatedKey=undefined}: BiodatasByGnMsLocOcFcFsBd) {
    console.assert( enabled !== undefined && verified !== undefined && gender && maritalStatus && pAddress?.country !== undefined && occupation && facialComplexion && financialStatus && minAge && maxAge);
    let userId = undefined, bDay = undefined;
    const PK = generateBiodataGSI5Keys({
        userId, enabled, verified, gender, maritalStatus, occupation, financialStatus, bDay, facialComplexion,pAddress
    }).GSI5PK;
    if (!minAge) minAge = 15;
    if (!maxAge) maxAge = 100;
    const minDate = moment().subtract(minAge, 'years').toISOString();
    const maxDate = moment().subtract(maxAge, 'years').toISOString();

    const SK = "BD#"+maxDate;
    const SK1 = "BD#"+minDate;
    const keyExpression = '#pk = :pk AND #sk BETWEEN :sk AND :sk1';
    // console.log("expression: ", keyExpression);
    const params = generateParams(keyExpression, 'GSI5PK', 'GSI5SK', PK, SK, 'GSI5', limit, lastEvaluatedKey, SK1);
    try {
        return performQuery(params);
    } catch (e) {
        throw e;
    }
}

interface BiodatasByGnMsOcLoc {
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string;
    occupation: string;
    pAddress: Address;
    limit?: number;
    lastEvaluatedKey?: any;
}

export async function getBiodatasByGnMsOcLoc({enabled, verified, gender, maritalStatus, occupation, pAddress, limit=1000, lastEvaluatedKey=undefined}: BiodatasByGnMsOcLoc) {
    console.assert( enabled !== undefined && verified !== undefined && gender && maritalStatus && pAddress?.country !== undefined && occupation);
    let userId = undefined;
    const PK = generateBiodataGSI6Keys({
        userId, enabled, verified, gender, maritalStatus, pAddress, occupation
    }).GSI6PK;
    const SK = generateQuerySK(pAddress, false);
    const keyExpression = '#pk = :pk' + (SK !== '' ? ' AND begins_with(#sk, :sk)': '');
    // console.log("expression: ", keyExpression);
    const params = generateParams(keyExpression, 'GSI6PK', 'GSI6SK', PK, SK, 'GSI6', limit, lastEvaluatedKey);
    try {
        return performQuery(params);
    } catch (e) {
        throw e;
    }
}

function generateParams(keyExpression, PKName, SKName, PK, SK, index, limit, last, SK1=undefined): QueryCommandInput{
    const ExpressionAttributeNames = {
        "#pk": PKName,
    };
    const values = {
        ":pk": PK,
    }
    if(SK !== '') {
        ExpressionAttributeNames['#sk'] = SKName
        values[':sk'] = SK
    }
    if(SK1){
        values[':sk1'] = SK1
    }

    const params: QueryCommandInput = {
        KeyConditionExpression: keyExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues: marshall(values),
        // ProjectionExpression: '', // TODO: add required attributes
        TableName: DynamodbConfig.tableName,
        Limit: limit
    }
    if(index) params.IndexName = index;
    if(last) params.ExclusiveStartKey = last;
    return params;
}

async function performQuery(params) {

    const command = new QueryCommand(params);
    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command);
        console.log("Last evaluated key: " + JSON.stringify(response.LastEvaluatedKey));
        let results: ShortBiodata[] = [];
        for (const rawItem of response.Items) {
            const item = unmarshall(rawItem);
            results.push(ShortBiodata.mapFromAlias(item))
        }
        return {results, lastEvaluatedKey: response.LastEvaluatedKey};
    } catch (e) {
        console.log(e);
        throw e;
    }

}

function generateQuerySK(address: Address, hasCountry: boolean) {
    let SK = '';
    if(address.division) {
        SK += "DIV#"+address.division;
        if(address.district) {
            SK += "#DIS#"+address.district;
            if(address.postOffice) {
                SK += "#PO#"+address.postOffice;
            }
        }
    }
    return (hasCountry && address.country)? ('CN#'+address.country+"#"+SK): SK;
}
