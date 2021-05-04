import { generateBiodataPrimaryKeys } from '../../utils/generateKeys';
import { QueryCommand, QueryCommandInput, QueryCommandOutput } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import Biodata from '../../../models/biodata/Biodata';

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