import { DeleteItemCommand, DeleteItemCommandInput, DeleteItemCommandOutput } from '@aws-sdk/client-dynamodb';
import DynamodbConfig from '../../dynamodbConfig';
import { marshall } from '@aws-sdk/util-dynamodb';
import dynamoDBClient from '../../core/getDynamoDBClient';
import { generateVRToken } from '../../../utils/helpers';

export async function deleteVR(token: string, secret: string): Promise<boolean> {
    const hashedToken = generateVRToken(token, secret);

    const params: DeleteItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Key: marshall({
            PK: "VR#TOKEN#" + hashedToken,
            SK: "VR#TOKEN#" + hashedToken,
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
