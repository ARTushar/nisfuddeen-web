import { PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import Account from '../../../models/user/Account';
import { checkUniquePK } from '../../../utils/dynoUtils';

export default async function(account: Account): Promise<Account> {
    const createdAt = new Date().toISOString();
    account.createdAt = createdAt;
    account.updatedAt = createdAt;
    // const ttl = Math.floor(expiresAt.getTime() / 1000);

    const params: PutItemCommandInput = {
        ConditionExpression: checkUniquePK,
        Item: marshall({
            PK: "ACCOUNT#PID#" + account.providerId + "#AID#" + account.providerAccountId,
            SK: "ACCOUNT#PID#" + account.providerId + "#AID#" + account.providerAccountId,
            GSI1PK: "USER#ID#" + account.userId,
            GSI1SK: "ACCOUNT#PID#" + account.providerId + "#AID#" + account.providerAccountId,
            ...account.mapToAlias(),
            _tp: "Account"
        }, {
            removeUndefinedValues: true
        }),
        TableName: DynamodbConfig.tableName
    }

    const command = new PutItemCommand(params);
    try {
        const response = await dynamoDBClient.send(command);
        console.log(response);
        return new Account({
            ...account,
            createdAt: createdAt,
            updatedAt: createdAt
        });
    } catch (e) {
        console.log(e);
        // return null;
        throw e;
    }
}
