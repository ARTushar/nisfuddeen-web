import {
    PutItemCommand,
    PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { generateSessionToken } from '../../../utils/helpers';
import DynamodbConfig from '../../utils/dynamodbConfig';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import Session from '../../../models/user/Session';
import { checkUniquePK } from '../../../utils/dynoUtils';

export default async function createSession (userId: string, sessionExpiration: number): Promise<Session> {
    const sessionToken = generateSessionToken();
    const accessToken = generateSessionToken();
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + sessionExpiration);
    const ttl = Math.floor(expiresAt.getTime() / 1000);
    const session = new Session({
        userId,
        sessionToken,
        accessToken,
        createdAt: createdAt.toISOString(),
        updatedAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString()
    })

    const params: PutItemCommandInput = {
        ConditionExpression: checkUniquePK,
        Item: marshall({
            PK: "SESSION#TOKEN#" + sessionToken,
            SK: "SESSION#TOKEN#" + sessionToken,
            GSI1PK: "USER#ID#" + userId,
            GSI1SK: "SESSION#TOKEN#" + sessionToken,
            ...session.mapToAlias(),
            ttl: ttl,
            _tp: "Session"
        }, {
            removeUndefinedValues: true
        }),
        TableName: DynamodbConfig.tableName
    }

    const command = new PutItemCommand(params);
    try {
        const response = await dynamoDBClient.send(command);
        console.log(response);
        return session;
    } catch (e) {
        console.log(e);
        throw e;
    }
}