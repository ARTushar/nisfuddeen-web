import { TransactWriteItem } from '@aws-sdk/client-dynamodb';
import DynamodbConfig from './dynamodbConfig';
import { marshall } from '@aws-sdk/util-dynamodb';

export function generateDelTransactItem(pk: string, sk: string): TransactWriteItem {
    return {
        'Delete': {
            TableName: DynamodbConfig.tableName,
            Key: marshall({
                PK: pk,
                SK: sk
            })
        }
    }
}
