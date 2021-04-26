import {
    PutItemCommand,
    PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { addDays, generateSessionToken } from '../../../utils/helpers';
import DynamodbConfig from '../../dynamodbConfig';
import dynamoDBClient from '../../core/getDynamoDBClient';
import { Session } from '../../../models/user/Session';
import { checkUniquePK } from '../../../utils/dynoUtils';

export default async function createSession (userId: string): Promise<Session> {
    const sessionToken = generateSessionToken();
    const sessionExpiration = 7;
    const createdAt = new Date();
    const expiresAt = addDays(createdAt, sessionExpiration);
    const ttl = Math.floor(expiresAt.getTime() / 1000);

    const params: PutItemCommandInput = {
        ConditionExpression: checkUniquePK,
        Item: marshall({
            PK: "SESSIONTOKEN" + "#" + sessionToken,
            SK: "SESSIONTOKEN" + "#" + sessionToken,
            GSI1PK: "SESSIONUSER" + "#" + userId,
            GSI1SK: "SESSIONTOKEN" + "#" + sessionToken,
            ca: createdAt.toISOString(),
            ea: expiresAt.toISOString(),
            ttl: ttl,
            _tp: "Session"
        }),
        TableName: DynamodbConfig.tableName
    }

    const command = new PutItemCommand(params);
    try {
        const response = await dynamoDBClient.send(command);
        console.log(response);
        return new Session({
            userId: userId,
            sessionId: sessionToken,
            createdAt: createdAt.toISOString(),
            expiredAt: expiresAt.toISOString()
        });
    } catch (e) {
        console.log(e);
        return null;
    }
}