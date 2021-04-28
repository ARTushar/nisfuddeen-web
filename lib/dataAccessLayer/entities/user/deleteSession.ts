import Session from '../../../models/user/Session';
import {
    DeleteItemCommand,
    DeleteItemCommandInput, DeleteItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
import DynamodbConfig from '../../dynamodbConfig';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import dynamoDBClient from '../../core/getDynamoDBClient';

export async function deleteSessionByToken(sessionToken: string): Promise<boolean> {
    const params: DeleteItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Key: marshall({
            PK: "SESSION#TOKEN#" + sessionToken,
            SK: "SESSION#TOKEN#" + sessionToken,
        }),
        // ProjectionExpression: '',
    }
    const command = new DeleteItemCommand(params);
    try {
        const response: DeleteItemCommandOutput = await dynamoDBClient.send(command)
        console.log(response);
        return true;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
