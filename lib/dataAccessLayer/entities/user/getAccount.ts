import Account from '../../../models/user/Account';
import {
    QueryCommand,
    QueryCommandInput, QueryCommandOutput
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { accountFactory } from '../../utils/factory';


export async function  getAccountByProviderAccountId(providerId: string, accountId: string): Promise<Account> {
    const params: QueryCommandInput = {
        KeyConditionExpression: '#pk = :pk AND #sk = :sk',
        ExpressionAttributeNames: {
            "#pk": "PK",
            "#sk": "SK"
        },
        ExpressionAttributeValues: marshall({
            ":pk": "ACCOUNT#PID#" + providerId + "#AID#" + accountId,
            ":sk": "ACCOUNT#PID#" + providerId + "#AID#" + accountId,
        }),
        // ProjectionExpression: '', // TO DO: add required attributes
        TableName: DynamodbConfig.tableName
    }
    const command = new QueryCommand(params);
    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command)
        console.log(response)
        if(response.Items.length == 1){
            const account = unmarshall(response.Items[0]);
            return accountFactory(account);
        }
        return null;
    } catch (e) {
        console.log(e);
        throw e;
    }
}


