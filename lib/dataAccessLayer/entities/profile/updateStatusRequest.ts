import { UpdateItemCommand, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import { marshall } from '@aws-sdk/util-dynamodb';
import { generateRequestPrimaryKey } from '../../utils/generateKeys';
import { requestAliases } from '../../utils/aliases';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { debug, objStringify } from '../../../utils/helpers';

export default async function(requestBy: string, requestTo: string, status: string): Promise<boolean> {
    const updatedAt = new Date().toISOString();

    const params: UpdateItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Key: marshall(generateRequestPrimaryKey(requestBy, requestTo)),
        UpdateExpression: 'set #status = :status, #ua = :ua',
        ExpressionAttributeNames: { '#status': requestAliases.status, '#ua': requestAliases.updatedAt },
        ExpressionAttributeValues: marshall({ ':status': status, ':ua': updatedAt }),
    }
    const command: UpdateItemCommand = new UpdateItemCommand(params);

    try {
        const response = await dynamoDBClient.send(command);
        debug('update_status_request_response', objStringify(response));
        return true;
    } catch (e) {
        debug('update_status_request_error', e)
    }
}
