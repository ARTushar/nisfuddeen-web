import { generateStarGSI1Key, generateStarPrimaryKey } from '../../utils/generateKeys';
import {
    BatchGetItemCommand,
    BatchGetItemInput,
    BatchGetItemOutput,
    QueryCommand,
    QueryCommandInput,
    QueryCommandOutput
} from '@aws-sdk/client-dynamodb';
import { generateBatchGetItem, generateQueryInput } from '../../utils/utils';
import Star from '../../../models/profile/Star';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { debug } from '../../../utils/helpers';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { starAliases } from '../../utils/aliases';
import ShortBiodata from '../../../models/biodata/ShortBiodata';
import DynamodbConfig from '../../utils/dynamodbConfig';

export async function getStarsBy(userId: string) {
    const conditionExpression = "#pk = :pk";
    const attributeNames = {
        '#pk': 'PK'
    };
    const attributeValues = {
        ':pk': generateStarPrimaryKey(userId, undefined).PK
    };

    const params: QueryCommandInput = generateQueryInput(conditionExpression, attributeNames, attributeValues);
    const command = new QueryCommand(params);
    let stars: Star[] = [];

    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command);
        debug("getStarsBy_response", JSON.stringify(response, null, 2));
        for (const item of response.Items) {
            stars.push(Star.mapFromAlias(unmarshall(item)));
        }

        const batchParams: BatchGetItemInput = generateBatchGetItem(stars, starAliases, 'starTo');
        const batchCommand =  new BatchGetItemCommand(batchParams);
        const batchResponse: BatchGetItemOutput = await dynamoDBClient.send(batchCommand);
        debug("getStarsBy_batch_response", JSON.stringify(batchResponse, null, 2));
        return retrieveShortBiodatas(batchResponse.Responses);

    } catch (e) {
        debug('getStarsBy_error', e)
        throw e;
    }
}
export async function getStarsTo(userId: string) {
    const conditionExpression = "#pk = :pk";
    const attributeNames = {
        '#pk': 'GSI1PK'
    };
    const attributeValues = {
        ':pk': generateStarGSI1Key(undefined, userId).GSI1PK
    };

    const params: QueryCommandInput = generateQueryInput(conditionExpression, attributeNames, attributeValues, false, 'GSI1');
    const command = new QueryCommand(params);
    let stars: Star[] = [];

    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command);
        debug("getStarsTo_response", JSON.stringify(response, null, 2));
        for (const item of response.Items) {
            stars.push(Star.mapFromAlias(unmarshall(item)));
        }

        const batchParams: BatchGetItemInput = generateBatchGetItem(stars, starAliases, 'starBy');
        const batchCommand =  new BatchGetItemCommand(batchParams);
        const batchResponse: BatchGetItemOutput = await dynamoDBClient.send(batchCommand);
        debug("getStarsTo_batch_response", JSON.stringify(batchResponse, null, 2));
        return retrieveShortBiodatas(batchResponse.Responses);

    } catch (e) {
        debug('getStarsTo_error', e)
        throw e;
    }
}

function retrieveShortBiodatas(response): ShortBiodata[] {
    let biodatas: ShortBiodata[] = [];
    for(const item of response[DynamodbConfig.tableName]) {
        biodatas.push(ShortBiodata.mapFromAlias(unmarshall(item)));
    }
    return biodatas;
}
