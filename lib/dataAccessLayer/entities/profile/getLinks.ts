import { QueryCommand, QueryCommandInput, QueryCommandOutput } from '@aws-sdk/client-dynamodb';
import { generateLinkGSI1Key, generateLinkPrimaryKey } from '../../utils/generateKeys';
import { generateQueryInput } from '../../utils/utils';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { debug, objStringify } from '../../../utils/helpers';
import Link from '../../../models/profile/Link';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export default async function(userId: string) {
    const conditionExpression = "#pk = :pk";
    const attributeNamesBy = {
        '#pk': 'PK'
    };
    const attributeNamesTo = {
        '#pk': 'GSI1PK'
    };
    const attributeValuesBy = {
        ':pk': generateLinkPrimaryKey(userId, undefined).PK
    }
    const attributeValuesTo = {
        ':pk': generateLinkGSI1Key(undefined, userId).GSI1PK
    }
    const paramsBy: QueryCommandInput = generateQueryInput(conditionExpression, attributeNamesBy, attributeValuesBy);
    const paramsTo: QueryCommandInput = generateQueryInput(conditionExpression, attributeNamesTo, attributeValuesTo, false, 'GSI1');

    debug("get_links", 'paramsBy', objStringify(paramsBy));
    debug("get_links", 'paramsTo', objStringify(paramsTo));

    const commandBy = new QueryCommand(paramsBy);
    const commandTo = new QueryCommand(paramsTo);

    let links: Link[] = [];

    try {
        const responseBy: QueryCommandOutput = await dynamoDBClient.send(commandBy);
        for(const item of responseBy.Items) {
            links.push(Link.mapFromAlias(unmarshall(item)));
        }
        const responseTo: QueryCommandOutput = await  dynamoDBClient.send(commandTo);
        for(const item of responseTo.Items) {
            links.push(Link.mapFromAlias(unmarshall(item)));
        }
        return links;
    } catch (e) {
        debug('getLink_error', e)
        throw e;
    }
}