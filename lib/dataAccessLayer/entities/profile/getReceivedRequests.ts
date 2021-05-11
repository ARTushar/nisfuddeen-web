import {  generateRequestGSI1Key } from '../../utils/generateKeys';
import { QueryCommand, QueryCommandInput, QueryCommandOutput } from '@aws-sdk/client-dynamodb';
import { generateQueryInput } from '../../utils/utils';
import Request from '../../../models/profile/Request';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { debug } from '../../../utils/helpers';

export default async function(userId: string) {
    const conditionExpression = "#pk = :pk";
    const attributeNames = {
        '#pk': 'GSI1'
    };
    const attributeValues = {
        ':pk': generateRequestGSI1Key(undefined, userId).GSI1PK
    };

    const params: QueryCommandInput = generateQueryInput(conditionExpression, attributeNames, attributeValues);

    const command = new QueryCommand(params);

    let requests: Request[] = [];

    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command);
        debug("getReceivedRequests_response", JSON.stringify(response, null, 2));
        for (const item of response.Items) {
            requests.push(Request.mapFromAlias(unmarshall(item)));
        }
        return requests;
    } catch (e) {
        debug('getReceivedRequests_error', e)
        throw e;
    }
}