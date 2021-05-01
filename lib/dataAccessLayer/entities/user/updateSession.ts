import {
    UpdateItemCommand, UpdateItemCommandInput, UpdateItemCommandOutput
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../dynamodbConfig';
import dynamoDBClient from '../../core/getDynamoDBClient';
import Session from '../../../models/user/Session';

export default async function updateSession (session: Session, sessionExpiration: number): Promise<Session> {
    const updatedAt = new Date();
    const expiresAt = new Date(updatedAt.getTime() + sessionExpiration);
    const ttl = Math.floor(expiresAt.getTime() / 1000);

    const params: UpdateItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Key: marshall({
            PK: "SESSION#TOKEN#" + session.sessionToken,
            SK: "SESSION#TOKEN#" + session.sessionToken,
        }),
        UpdateExpression: 'SET #ea = :ea,, #ua = :ua, #ttl = :ttl',
        ExpressionAttributeNames: {
            "#ea": "ea",
            "#ua": "ua",
            "#ttl": "ttl"
        },
        ExpressionAttributeValues: marshall({
            ":ea": expiresAt.toISOString(),
            ":ttl": ttl,
            ":ua": updatedAt.toISOString()
        }),
    }

    const command = new UpdateItemCommand(params);
    try {
        const response: UpdateItemCommandOutput = await dynamoDBClient.send(command);
        console.log(response);
        return new Session({
            ...session,
            updatedAt: updatedAt.toISOString(), // TO DO: not the valid createdAt
            expiresAt: expiresAt.toISOString()
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
}
