import { PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import Request from '../../../models/profile/Request';
import { generatePutItemRaw } from '../../utils/utils';
import { generateRequestGSI1Key, generateRequestPrimaryKey } from '../../utils/generateKeys';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { debug } from '../../../utils/helpers';

export default async function(by: string, to: string): Promise<Request> {
    const createdAt = new Date().toISOString();
    const defaultStatus = 'sent'
    const request: Request = new Request({
        requestBy: by,
        requestTo: to,
        status: defaultStatus,
        createdAt: createdAt,
        updatedAt: createdAt
    })

    const params: PutItemCommandInput = generatePutItemRaw(
      [generateRequestPrimaryKey, generateRequestGSI1Key],
      [[by, to], [by, to]], request, 'Request'
    )

    const command = new PutItemCommand(params);
    try {
        const response = await dynamoDBClient.send(command);
        debug("CreateRequest_response", JSON.stringify(response, null, 2));
        return request;
    } catch (e) {
        throw e;
    }
}
