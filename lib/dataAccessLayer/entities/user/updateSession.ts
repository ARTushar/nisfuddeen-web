import {
    UpdateItemCommand, UpdateItemCommandInput, UpdateItemCommandOutput
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { addDays } from '../../../utils/helpers';
import DynamodbConfig from '../../dynamodbConfig';
import dynamoDBClient from '../../core/getDynamoDBClient';
import Session from '../../../models/user/Session';

export default async function updateSession (sessionToken: string, userId: string, sessionExpiration: number): Promise<Session> {
    const createdAt = new Date();
    const expiresAt = addDays(createdAt, sessionExpiration);
    const ttl = Math.floor(expiresAt.getTime() / 1000);

    const params: UpdateItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Key: marshall({
            PK: "SESSIONTOKEN" + "#" + sessionToken,
            SK: "SESSIONTOKEN" + "#" + sessionToken,
        }),
        UpdateExpression: 'SET #ea = :ea, #ttl = :ttl',
        ExpressionAttributeNames: {
            "#ea": "ea",
            "#ttl": "ttl"
        },
        ExpressionAttributeValues: marshall({
            ":ea": expiresAt.toISOString(),
            ":ttl": ttl,
        }),
    }

    const command = new UpdateItemCommand(params);
    try {
        const response: UpdateItemCommandOutput = await dynamoDBClient.send(command);
        console.log(response);
        return new Session({
            userId: userId,
            sessionId: sessionToken,
            createdAt: createdAt.toISOString(), // TO DO: not the valid createdAt
            expiresAt: expiresAt.toISOString()
        });
    } catch (e) {
        console.log(e);
        return null;
    }
}
