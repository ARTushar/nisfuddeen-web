import { UpdateItemCommand, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
import { generateLinkPrimaryKey } from '../../utils/generateKeys';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import { linkAliases } from '../../utils/aliases';
import { debug, objStringify } from '../../../utils/helpers';
import dynamoDBClient from '../../utils/getDynamoDBClient';

export default async function(linkBy: string, linkTo: string, status: string): Promise<boolean> {
    const updatedAt = new Date().toISOString();

    const params: UpdateItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Key: marshall(generateLinkPrimaryKey(linkBy, linkTo)),
        UpdateExpression: 'set #status = :status, #ua = :ua',
        ExpressionAttributeNames: { '#status': linkAliases.status, '#ua': linkAliases.updatedAt },
        ExpressionAttributeValues: marshall({ ':status': status, ':ua': updatedAt }),
    }
    const command: UpdateItemCommand = new UpdateItemCommand(params);

    try {
        const response = await dynamoDBClient.send(command);
        debug('update_status_link_response', objStringify(response));
        return true;
    } catch (e) {
        debug('update_status_link_error', e)
    }
}