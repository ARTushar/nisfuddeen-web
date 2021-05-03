import { TransactWriteItem } from '@aws-sdk/client-dynamodb';
import DynamodbConfig from './dynamodbConfig';
import { marshall } from '@aws-sdk/util-dynamodb';

export function generateDelTransactItem(pk: string, sk: string): TransactWriteItem {
    return {
        Delete: {
            TableName: DynamodbConfig.tableName,
            Key: marshall({
                PK: pk,
                SK: sk
            })
        }
    }
}

export function generatePutTransactItem(item): TransactWriteItem {
    return {
        Put: {
            TableName: DynamodbConfig.tableName,
            Item: marshall(item, {removeUndefinedValues: true}),
        }
    }
}

export function mapItem(item, aliases, values) {
    for(const key of Object.keys(aliases)){
        item[aliases[key]] = key !== 'birthDay' ? values[key]: values[key].toISOString()
    }
}

export function generatePutTransactItemRaw(keyGenerator, params, aliases, values, type): TransactWriteItem {
    const keys = keyGenerator(...params);
    let item = {
        PK: keys.PK,
        SK: keys.SK
    };
    mapItem(item, aliases, values);
    item['_tp'] = type;

    return generatePutTransactItem(item);
}