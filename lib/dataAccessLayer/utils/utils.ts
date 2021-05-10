import { PutItemCommandInput, TransactWriteItem } from '@aws-sdk/client-dynamodb';
import DynamodbConfig from './dynamodbConfig';
import { marshall } from '@aws-sdk/util-dynamodb';
import { getKeys } from '../../scripts/utils/utils';

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

export function mapItemToAlias(aliases, values) {
    let item = {};
    for(const key of Object.keys(aliases)){
        item[aliases[key]] = values[key];
    }
    return item;
}

export function mapItemFromAlias(aliases, values) {
    let item = {};
    for(const key of Object.keys(aliases)){
        item[key] =  values[aliases[key]];
    }
    return item;
}

export function generatePutTransactItemRaw(keyGenerator, params, values, type): TransactWriteItem {
    const keys = keyGenerator(...params);
    const item = {
        PK: keys.PK,
        SK: keys.SK,
        ...values.mapToAlias(),
        '_tp': type
    };

    return generatePutTransactItem(item);
}

export function generateUpdateTransactWriteItem(key, expression, names, values, condition=undefined): TransactWriteItem {
    let item: TransactWriteItem = {
        Update: {
            TableName: DynamodbConfig.tableName,
            Key: marshall(key),
            UpdateExpression: expression,
            ExpressionAttributeNames: names,
            ExpressionAttributeValues: marshall(values, { removeUndefinedValues:true}),
        }
    }
    if(condition) {
        item.Update['ConditionExpression'] = condition;
    }
    return item;
}

export function generatePutItemRaw(keyGenerators, params, values, type, condition=undefined): PutItemCommandInput{
    let item: PutItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Item: marshall(generateItemFromGenerators(keyGenerators, params, values, type)),
    }
    if(condition) {
        item['ConditionExpression'] = condition;
    }
    return item;
}

function generateItemFromGenerators(keyGenerators, params, values, type) {
    let item = values.mapToAlias();
    let i = 0;
    for(const generator of keyGenerators) {
        const key = generator(...params[i]);
        for(const k of getKeys(key)) {
            item[k] = key[k];
        }
        i++;
    }
    item['_tp'] = type;
    return item;
}