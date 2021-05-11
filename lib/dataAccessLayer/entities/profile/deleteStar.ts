import { DeleteItemCommand, DeleteItemCommandInput, DeleteItemCommandOutput } from '@aws-sdk/client-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import { marshall } from '@aws-sdk/util-dynamodb';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { generateStarPrimaryKey } from '../../utils/generateKeys';
import { debug, objStringify } from '../../../utils/helpers';

export default async function(starBy: string, starTo: string): Promise<boolean> {

    const debug_code = 'delete_star'
    const params: DeleteItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Key: marshall(generateStarPrimaryKey(starBy, starTo)),
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
