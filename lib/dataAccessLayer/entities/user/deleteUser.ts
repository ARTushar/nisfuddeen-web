import User from '../../../models/user/User';
import {
    TransactWriteItem,
    TransactWriteItemsCommand,
    TransactWriteItemsCommandInput,
    TransactWriteItemsCommandOutput
} from '@aws-sdk/client-dynamodb';
import DynamodbConfig from '../../dynamodbConfig';
import { marshall } from '@aws-sdk/util-dynamodb';
import dynamoDBClient from '../../core/getDynamoDBClient';
import { getUserById } from './getUser';

export async function deleteUserById(userId: string): Promise<User> {
    // TODO: Delete all the associated sessions and linked accounts
    const user: User = await getUserById(userId);

    const items: TransactWriteItem[] = [
        {
            Delete: {
                TableName: DynamodbConfig.tableName,
                Key: marshall({
                    PK: "USER#ID#" + userId,
                    SK: "USER#ID#" + userId,
                })
            }
        },
        {
            Delete: {
                TableName: DynamodbConfig.tableName,
                Key: marshall({
                    PK: "USER#MOBILE#" + user.mobileNumber,
                    SK: "USER#MOBILE#" + user.mobileNumber,
                })
            }
        },
        {
            Delete: {
                TableName: DynamodbConfig.tableName,
                Key: marshall({
                    PK: "USER#EMAIL#" + user.email,
                    SK: "USER#EMAIL#" + user.email,
                })
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
        throw e;
    }
}
