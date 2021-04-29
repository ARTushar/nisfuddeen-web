import {
    QueryCommand,
    QueryCommandInput, QueryCommandOutput
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../dynamodbConfig';
import dynamoDBClient from '../../core/getDynamoDBClient';
import { vrFactory } from '../../utils/factory';
import { generateVRToken } from '../../../utils/helpers';
import VR from '../../../models/user/VR';

export async function  getVR(token: string, secret: string): Promise<VR> {
    const hashedToken = generateVRToken(token, secret);
    const currentEpoch = Math.floor(Date.now() / 1000);

    const params: QueryCommandInput = {
        TableName: DynamodbConfig.tableName,
        KeyConditionExpression: '#PK = :pk AND #SK = :sk',
        FilterExpression: '#ttl > :epoch',
        ExpressionAttributeNames: {
            "#PK": "PK",
            "#SK": "SK",
            "#ttl": "ttl"
        },
        ExpressionAttributeValues: marshall({
            ":pk": "VR#TOKEN#" + hashedToken,
            ":sk": "VR#TOKEN#" + hashedToken,
            ":epoch": currentEpoch
        }),
        // ProjectionExpression: '',
    }
    const command = new QueryCommand(params);
    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command)
        console.log(response);
        if (response.Items.length == 1){
            const vr = unmarshall(response.Items[0]);
            return vrFactory(vr);
        }
        return null;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
