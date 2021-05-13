import VR from '../../../models/user/VR';
import { PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { checkUniquePK } from '../../../utils/dynoUtils';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { generateVRToken } from '../../../utils/helpers';

export default async function createVR (identifier: string, token:string, secret: string, sessionExpiration: number): Promise<VR> {
    const hashedToken = generateVRToken(token, secret);
    const createdAt = new Date();
    const expiresAt = sessionExpiration ? new Date(createdAt.getTime() + sessionExpiration) : null;
    const ttl = expiresAt ? Math.floor(expiresAt.getTime() / 1000) : undefined;

    const vr = new VR({
        token: hashedToken,
        identifier: identifier,
        expiresAt: expiresAt?.toISOString(),
        createdAt: createdAt.toISOString(),
        updatedAt: createdAt.toISOString()
    })

    const params: PutItemCommandInput = {
        ConditionExpression: checkUniquePK,
        Item: marshall({
            PK: "VR#TOKEN#" + hashedToken,
            SK: "VR#TOKEN#" + hashedToken,
            ...vr.mapToAlias(),
            ttl: ttl,
            _tp: "VR"
        }, {
            removeUndefinedValues: true
        }),
        TableName: DynamodbConfig.tableName
    }

    const command = new PutItemCommand(params);
    try {
        const response = await dynamoDBClient.send(command);
        console.log(response);
        return vr;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
