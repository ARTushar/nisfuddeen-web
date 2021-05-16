import {
    DeleteItemCommand,
    DeleteItemCommandInput, DeleteItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import { marshall } from '@aws-sdk/util-dynamodb';
import dynamoDBClient from '../../utils/getDynamoDBClient';

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
