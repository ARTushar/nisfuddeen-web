import {
    QueryCommand,
    QueryCommandInput, QueryCommandOutput
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../dynamodbConfig';
import dynamoDBClient from '../../core/getDynamoDBClient';
import Session from '../../../models/user/Session';
import { sessionFactory } from '../../utils/factory';

export async function getSessionByToken(sessionToken: string): Promise<Session> {
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
            ":pk": "SESSION#TOKEN#" + sessionToken,
            ":sk": "SESSION#TOKEN#" + sessionToken,
            ":epoch": currentEpoch
        }),
        // ProjectionExpression: '',
    }
    const command = new QueryCommand(params);
    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command)
        console.log(response);
        if (response.Items.length == 1){
            const session = unmarshall(response.Items[0]);
            return sessionFactory(session);
        }
        return null;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
