import { PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import Link from '../../../models/profile/Link';
import { generatePutItemRaw } from '../../utils/utils';
import { generateLinkGSI1Key, generateLinkPrimaryKey } from '../../utils/generateKeys';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { debug } from '../../../utils/helpers';

export default async function(by: string, to: string, relation: string): Promise<Link> {
    const createdAt = new Date().toISOString();
    const defaultStatus = 'pending';
    const link: Link = new Link({
        linkBy: by,
        linkTo: to,
        relation,
        createdAt: createdAt,
        updatedAt: createdAt,
        status: defaultStatus
    })

    const params: PutItemCommandInput = generatePutItemRaw(
      [generateLinkPrimaryKey, generateLinkGSI1Key],
      [[by, to], [by, to]], link, 'Link'
    )

    const command = new PutItemCommand(params);
    try {
        const response = await dynamoDBClient.send(command);
        debug("CreateLink_response", JSON.stringify(response, null, 2));
        return link;
    } catch (e) {
        throw e;
    }
}
