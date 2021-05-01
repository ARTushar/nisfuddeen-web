import User from '../../../models/user/User';
import dynamoDBClient from '../../core/getDynamoDBClient';
import {
    TransactWriteItem,
    TransactWriteItemsCommand,
    TransactWriteItemsCommandInput, TransactWriteItemsCommandOutput
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../dynamodbConfig';
import { generateID } from '../../../utils/helpers';
import { checkUniquePK } from '../../../utils/dynoUtils';


export default async function (user: User): Promise<User> {
    const userId = await generateID();
    user.userId = userId;
    user.createdAt = new Date().toISOString();
    user.updatedAt = user.createdAt;

    const userItem: TransactWriteItem = {
        Put: {
            TableName: DynamodbConfig.tableName,
            Item: marshall({
                PK: "USER#ID#" + userId,
                SK: "USER#ID#" + userId,
                GSI1PK: "USER#EMAIL#" + user.email,
                GSI1SK: "USER#EMAIL#" + user.email,
                GSI2PK: "USER#MOBILE#" + user.mobileNumber,
                GSI2SK: "USER#MOBILE#" + user.mobileNumber,
                id: userId,
                fn: user.fullName,
                em: user.email,
                mb: user.mobileNumber,
                ac: user.accountType,
                st: user.subscriptionType,
                emv: user.emailVerified,
                _ca: user.createdAt,
                _ua: user.updatedAt,
                _tp: "User"
            }, {
                removeUndefinedValues: true,
            }),
            ConditionExpression: checkUniquePK
        }
    }

    const emailItem: TransactWriteItem = {
        Put: {
            TableName: DynamodbConfig.tableName,
            Item: marshall({
                PK: "USER#EMAIL#" + user.email,
                SK: "USER#EMAIL#" + user.email,
                _tp: "UserEmail"
            }),
            ConditionExpression: checkUniquePK
        }
    }

    const mobileItem: TransactWriteItem = {
        Put: {
            TableName: DynamodbConfig.tableName,
            Item: marshall({
                PK: "USER#MOBILE#" + user.mobileNumber,
                SK: "USER#MOBILE#" + user.mobileNumber,
                _tp: "UserMobile"
            }),
            ConditionExpression: checkUniquePK
        }
    }

    let items: TransactWriteItem[] = [userItem];
    if(user.email) items.push(emailItem);
    if(user.mobileNumber) items.push(mobileItem);

    const params: TransactWriteItemsCommandInput = {
        TransactItems: items,
    }
    const command: TransactWriteItemsCommand = new TransactWriteItemsCommand(params);

    try {
        const response:TransactWriteItemsCommandOutput = await dynamoDBClient.send(command)
        console.log(response);
        return user;
    } catch (e) {
        console.log(e)
        throw e;
    }
}