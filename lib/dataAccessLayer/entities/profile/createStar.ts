import { PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import Star from '../../../models/profile/Star';
import { generatePutItemRaw } from '../../utils/utils';
import { generateStarGSI1Key, generateStarPrimaryKey } from '../../utils/generateKeys';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { debug } from '../../../utils/helpers';

export default async function(by: string, to: string): Promise<Star> {
    const starredAt = new Date().toISOString();
    const star: Star = new Star({
        starBy: by,
        starTo: to,
        starredAt
    })

    const params: PutItemCommandInput = generatePutItemRaw(
      [generateStarPrimaryKey, generateStarGSI1Key],
      [[by, to], [by, to]], star, 'Star'
    )

    const command = new PutItemCommand(params);
    try {
        const response = await dynamoDBClient.send(command);
        debug("CreateStar_response", JSON.stringify(response, null, 2));
        return star;
    } catch (e) {
        throw e;
    }
}