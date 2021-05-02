import User from '../../../models/user/User';
import {
    TransactWriteItem,
    TransactWriteItemsCommand,
    TransactWriteItemsCommandInput,
    TransactWriteItemsCommandOutput
} from '@aws-sdk/client-dynamodb';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { getUserById } from './getUser';
import { getAccountsSessionsById } from './getAccountsSessions';
import { generateDelTransactItem } from '../../utils/utils';

export async function deleteUserById(userId: string): Promise<User> {
    // Delete all the associated sessions and linked accounts
    const user: User = await getUserById(userId);
    if(!user) return null;
    let accountsSessions;
    try {
        accountsSessions = await getAccountsSessionsById(userId);
    } catch (e) {
        throw e;
    }

    const userKey = "USER#ID#" + userId;
    const mobileKey = "USER#MOBILE#" + user.mobileNumber;
    const emailKey = "USER#EMAIL#" + user.email;

    let items: TransactWriteItem[] = [generateDelTransactItem(userKey, userKey)];
    if(user.mobileNumber) items.push(generateDelTransactItem(mobileKey, mobileKey));
    if(user.email) items.push(generateDelTransactItem(emailKey, emailKey));

    for(const output of accountsSessions){
        items.push(generateDelTransactItem(output.GSI1SK, output.GSI1SK))
    }
    // TODO: Assure the length is less than 25 (hard limit of transact write)
    console.assert(items.length <= 25);

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

