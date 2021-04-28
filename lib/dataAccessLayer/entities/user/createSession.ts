import {
    PutItemCommand,
    PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { generateSessionToken } from '../../../utils/helpers';
import DynamodbConfig from '../../dynamodbConfig';
import dynamoDBClient from '../../core/getDynamoDBClient';
import Session from '../../../models/user/Session';
import { checkUniquePK } from '../../../utils/dynoUtils';

export default async function createSession (userId: string, sessionExpiration: number): Promise<Session> {
    const sessionToken = generateSessionToken();
    const accessToken = generateSessionToken();
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + sessionExpiration);
    const ttl = Math.floor(expiresAt.getTime() / 1000);

    const params: PutItemCommandInput = {
        ConditionExpression: checkUniquePK,
        Item: marshall({
            PK: "SESSION#TOKEN#" + sessionToken,
            SK: "SESSION#TOKEN#" + sessionToken,
            GSI1PK: "USER#ID#" + userId,
            GSI1SK: "SESSION#TOKEN#" + sessionToken,
            sid: sessionToken,
            at: accessToken,
            uid: userId,
            ca: createdAt.toISOString(),
            ua: createdAt.toISOString(),
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
            accessToken: accessToken,
            createdAt: createdAt.toISOString(),
            updatedAt: createdAt.toISOString(),
            expiresAt: expiresAt.toISOString()
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
}