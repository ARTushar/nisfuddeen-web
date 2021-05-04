import { generateBiodataGSI1Keys, generateBiodataPrimaryKeys } from '../../utils/generateKeys';
import { QueryCommand, QueryCommandInput, QueryCommandOutput } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import Biodata from '../../../models/biodata/Biodata';
import Address from '../../../models/biodata/Address';
import ShortBiodata from '../../../models/biodata/ShortBiodata';

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

export async function getBiodatasBy1(enabled: boolean, verified: boolean, gender: string, maritalStatus: string, pAddress: Address, limit: number=1000, lastEvaluatedKey=undefined) {
    console.assert( enabled !== undefined && verified !== undefined && gender && maritalStatus && pAddress?.country !== undefined);
    let userId = undefined;
    const PK = generateBiodataGSI1Keys({
        userId, enabled, verified, gender, maritalStatus, pAddress
    }).GSI1PK;
    let SK = "";
    if(pAddress.division) {
        SK += "DIV#"+pAddress.division;
        if(pAddress.district) {
            SK += "#DIS#"+pAddress.district;
            if(pAddress.postOffice) {
                SK += "#PO#"+pAddress.postOffice;
            }
        }
    }
    const keyExpression = '#pk = :pk' + (SK !== '' ? 'AND begins_with(#sk, :sk)': '');
    // console.log("expression: ", keyExpression);

    const params = generateParams(keyExpression, 'GSI1PK', 'GSI1SK', PK, SK, 'GSI1', limit, lastEvaluatedKey);

    try {
        return performQuery(params);
    } catch (e) {
        throw e;
    }
}


function generateParams(keyExpression, PKName, SKName, PK, SK, index, limit, last): QueryCommandInput{
    const ExpressionAttributeNames = {
        "#pk": PKName,
    };
    const values = {
        ":pk": PK,
    }
    if(SK !== '') {
        ExpressionAttributeNames['#SK'] = SKName
        values[':sk'] = SK
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
        let biodatas: ShortBiodata[] = [];
        for (const rawItem of response.Items) {
            const item = unmarshall(rawItem);
            biodatas.push(ShortBiodata.mapFromAlias(item))
        }
        return biodatas;
    } catch (e) {
        console.log(e);
        throw e;
    }

}

