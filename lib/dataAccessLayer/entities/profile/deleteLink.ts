import { DeleteItemCommand, DeleteItemCommandInput, DeleteItemCommandOutput } from '@aws-sdk/client-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import { marshall } from '@aws-sdk/util-dynamodb';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { generateLinkPrimaryKey } from '../../utils/generateKeys';
import { debug, objStringify } from '../../../utils/helpers';

export default async function(linkBy: string, linkTo: string): Promise<boolean> {

    const debug_code = 'delete_link'
    const params: DeleteItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Key: marshall(generateLinkPrimaryKey(linkBy, linkTo)),
    }
    const command = new DeleteItemCommand(params);
    try {
        const response: DeleteItemCommandOutput = await dynamoDBClient.send(command)
        debug(debug_code, 'response', objStringify(response));
        return true;
    } catch (e) {
        debug(debug_code, 'error', e);
        throw e;
    }
}
