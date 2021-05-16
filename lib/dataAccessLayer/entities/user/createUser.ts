import User from '../../../models/user/User';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import {
    TransactWriteItem,
    TransactWriteItemsCommand,
    TransactWriteItemsCommandInput, TransactWriteItemsCommandOutput
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import { generateID } from '../../../utils/helpers';
import { checkUniquePK } from '../../../utils/dynoUtils';
import { generateUserGSI1Keys, generateUserGSI2Keys, generateUserPrimaryKeys } from '../../utils/generateKeys';


export default async function (user: User): Promise<User> {
    const userId = await generateID();
    user.id = userId;
    user.createdAt = new Date().toISOString();
    user.updatedAt = user.createdAt;

    const primaryKeys = generateUserPrimaryKeys(userId);
    const gsi1Keys = generateUserGSI1Keys(user.email);
    const gsi2Keys = generateUserGSI2Keys(user.mobileNumber);
    const userItem: TransactWriteItem = {
        Put: {
            TableName: DynamodbConfig.tableName,
            Item: marshall({
                PK: primaryKeys.PK,
                SK: primaryKeys.SK,
                GSI1PK: gsi1Keys.GSI1PK,
                GSI1SK: gsi1Keys.GSI1SK,
                GSI2PK: gsi2Keys.GSI2PK,
                GSI2SK: gsi2Keys.GSI2SK,
                ...user.mapToAlias(),
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
                PK: gsi1Keys.GSI1PK,
                SK: gsi1Keys.GSI1SK,
                _tp: "UserEmail"
            }),
            ConditionExpression: checkUniquePK
        }
    }

    const mobileItem: TransactWriteItem = {
        Put: {
            TableName: DynamodbConfig.tableName,
            Item: marshall({
                PK: gsi2Keys.GSI2PK,
                SK: gsi2Keys.GSI2SK,
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