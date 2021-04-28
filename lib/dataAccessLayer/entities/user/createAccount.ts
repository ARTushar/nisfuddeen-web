import { PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../dynamodbConfig';
import dynamoDBClient from '../../core/getDynamoDBClient';
import Account from '../../../models/user/Account';
import { checkUniquePK } from '../../../utils/dynoUtils';

export default async function(account: Account): Promise<Account> {
    const createdAt = new Date().toISOString();
    // const ttl = Math.floor(expiresAt.getTime() / 1000);

    const params: PutItemCommandInput = {
        ConditionExpression: checkUniquePK,
        Item: marshall({
            PK: "ACCOUNT#PID#" + account.providerId + "#AID#" + account.accountId,
            SK: "ACCOUNT#PID#" + account.providerId + "#AID#" + account.accountId,
            GSI1PK: "USER#ID#" + account.userId,
            GSI1SK: "ACCOUNT#PID#" + account.providerId + "#AID#" + account.accountId,
            pid: account.providerId,
            uid: account.userId,
            aid: account.accountId,
            pt: account.providerType,
            rt: account.refreshToken,
            at: account.accessToken,
            ate: account.accessTokenExpires,
            _ca: createdAt,
            _ua: createdAt,
            _tp: "Account"
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
