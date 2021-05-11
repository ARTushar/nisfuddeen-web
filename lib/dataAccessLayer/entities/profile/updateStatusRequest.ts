import { UpdateItemCommand, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import { marshall } from '@aws-sdk/util-dynamodb';
import { generateRequestPrimaryKey } from '../../utils/generateKeys';
import { requestAliases } from '../../utils/aliases';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { debug, objStringify } from '../../../utils/helpers';

export default async function(requestBy: string, requestTo: string, status: string): Promise<boolean> {

    const params: UpdateItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Key: marshall(generateRequestPrimaryKey(requestBy, requestTo)),
        UpdateExpression: 'set #status = :status',
        ExpressionAttributeNames: { '#status': requestAliases.status },
        ExpressionAttributeValues: marshall({ ':status': status }),
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
