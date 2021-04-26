import { User } from '../../../models/user/User';
import dynamoDBClient from '../../core/getDynamoDBClient';
import {
    TransactWriteItem,
    TransactWriteItemsCommand,
    TransactWriteItemsCommandInput, TransactWriteItemsCommandOutput
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../dynamodbConfig';
import { generateID } from '../../../utils/helpers';
import { hashPassword } from '../../../utils/passwordHelpers';
import { checkUniquePK } from '../../../utils/dynoUtils';


export default async function (user: User): Promise<User> {
    const userId = await generateID();
    const passwordHash = await hashPassword(user.password);
    user.userId = userId;
    user.password = passwordHash;
    user.createdAt = new Date().toISOString();
    user.updatedAt = user.createdAt;
    const items: TransactWriteItem[] = [
        {
            Put: {
                TableName: DynamodbConfig.tableName,
                Item: marshall({
                    PK: "USER" + "#" + userId,
                    SK: "USER" + "#" + userId,
                    GS1PK: "USER" + "#" + user.email,
                    GS1SK: "USER" + "#" + user.email,
                    GS2PK: "USER" + "#" + user.mobileNumber,
                    GS2SK: "USER" + "#" + user.mobileNumber,
                    id: userId,
                    fn: user.fullName,
                    em: user.email,
                    mb: user.mobileNumber,
                    ac: user.accountType,
                    st: user.subscriptionType,
                    ha: passwordHash,
                    _ca: user.createdAt,
                    _ua: user.updatedAt,
                    _tp: "User"
                }),
                ConditionExpression: checkUniquePK
            }
        },
        {
            Put: {
                TableName: DynamodbConfig.tableName,
                Item: marshall({
                    PK: "USER" + "#" + user.mobileNumber,
                    SK: "USER" + "#" + user.mobileNumber,
                    _tp: "UserMobile"
                }),
                ConditionExpression: checkUniquePK
            }
        },
        {
            Put: {
                TableName: DynamodbConfig.tableName,
                Item: marshall({
                    PK: "USER" + "#" + user.email,
                    SK: "USER" + "#" + user.email,
                    _tp: "UserEmail"
                }),
                ConditionExpression: checkUniquePK
            }
        }
    ]

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
        return null;
    }
}