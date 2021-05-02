import {
    DeleteItemCommand,
    DeleteItemCommandInput, DeleteItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import dynamoDBClient from '../../utils/getDynamoDBClient';

export async function deleteAccount(providerId: string, accountId: string): Promise<boolean> {
    const params: DeleteItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Key: marshall({
            PK: "ACCOUNT#PID#" + providerId + "#AID#" + accountId,
            SK: "ACCOUNT#PID#" + providerId + "#AID#" + accountId,
        })
    }

    const command = new DeleteItemCommand(params);
    try {
        const response: DeleteItemCommandOutput = await dynamoDBClient.send(command);
        console.log(response);
        return true;
    } catch (e) {
        console.log(e);
        // return null;
        throw e;
    }
}
