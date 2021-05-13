import User from '../../../models/user/User';
import {
    TransactWriteItemsCommand,
    TransactWriteItemsCommandInput,
    TransactWriteItem
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { userAliases } from '../../utils/aliases';
import { checkUniquePK } from '../../../utils/dynoUtils';
import { getUserById } from './getUser';
import { generateUserGSI1Keys, generateUserGSI2Keys, generateUserPrimaryKeys } from '../../utils/generateKeys';
import { getKeys } from '../../../scripts/utils/utils';

export async function updateUser(user: User): Promise<User> {
    console.log("--updating user " + JSON.stringify(user, null, 2));
    user.updatedAt = new Date().toISOString();
    let oldUser;
    try {
        oldUser = await getUserById(user.id);
        if(!oldUser) return null;
    } catch (e) {
        throw e;
    }
    // check same values as before
    const updated = deleteSameFields(oldUser, user);
    if(!updated) return null;

    const updatedVals = generateUpdateAttributes(user)

    console.log("--updating user " + JSON.stringify(user, null, 2));
    console.log("--updated vals " + JSON.stringify(updatedVals, null, 2));

    const oldGsi1Keys = generateUserGSI1Keys(oldUser.email);

    const oldEmailItem: TransactWriteItem = {
        Delete: {
            TableName: DynamodbConfig.tableName,
            Key: marshall({
                PK: oldGsi1Keys.GSI1PK,
                SK: oldGsi1Keys.GSI1SK
            })
        }
    }

    const oldGsi2Keys = generateUserGSI2Keys(oldUser.mobileNumber);

    const oldMobileItem: TransactWriteItem = {
        Delete: {
            TableName: DynamodbConfig.tableName,
            Key: marshall({
                PK: oldGsi2Keys.GSI2PK,
                SK: oldGsi2Keys.GSI2SK
            })
        }
    }

    const gsi1Keys = generateUserGSI1Keys(user.email);

    const emailItem: TransactWriteItem = {
        Put: {
            TableName: DynamodbConfig.tableName,
            Item: marshall({
                PK: gsi1Keys.GSI1PK,
                SK: gsi1Keys.GSI1SK,
                _tp: "UserMobile"
            }),
            ConditionExpression: checkUniquePK
        }
    }

    const gsi2Keys = generateUserGSI2Keys(user.mobileNumber);

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

    const primaryKeys = generateUserPrimaryKeys(user.id);

    const userItem: TransactWriteItem = {
        Update: {
            TableName: DynamodbConfig.tableName,
            Key: marshall(primaryKeys),
            UpdateExpression: updatedVals.updateExpression,
            ExpressionAttributeNames: updatedVals.attributeNames,
            ExpressionAttributeValues: marshall(updatedVals.attributeValues, {removeUndefinedValues: true})
        }
    }
    let items: TransactWriteItem[] = [userItem];
    if(user.email && oldUser.email !== user.email) {
        items.push(emailItem);
        if(oldUser.email) items.push(oldEmailItem);
    }
    if(user.mobileNumber && oldUser.mobileNumber !== user.mobileNumber) {
        items.push(mobileItem);
        if(oldUser.mobileNumber) items.push(oldMobileItem);
    }
    // console.log(JSON.stringify(items, null, 2));

    const params: TransactWriteItemsCommandInput = {
        TransactItems: items
    }
    const command = new TransactWriteItemsCommand(params);

    try {
        const response = await dynamoDBClient.send(command);
        console.log(response);
        return user;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

function generateUpdateAttributes(user: User) {
    let attributeNames = {};
    let attributeValues = {};
    let updateExpression = 'set ';

    for(const key in user) {
        if(key === "id" || key === 'createdAt') continue;
        if(user.hasOwnProperty(key) && user[key] !== undefined){
            const alias = userAliases[key];
            const av = ':' + alias;
            const an = '#' + alias;
            attributeValues[av] = user[key];
            attributeNames[an] = alias;
            updateExpression += `${an} = ${av}, `
            if(key === 'email') {
                const gsi1Keys = generateUserGSI1Keys(user.email);
                attributeValues[":gsi1pk"] = gsi1Keys.GSI1PK;
                attributeValues[":gsi1sk"] = gsi1Keys.GSI1SK;
                attributeNames["#gsi1pk"] = "GSI1PK";
                attributeNames["#gsi1sk"] = "GSI1SK";
                updateExpression += '#gsi1pk = :gsi1pk, #gsi1sk = :gsi1sk, ';
            }
            if(key === 'mobileNumber') {
                const gsi2Keys = generateUserGSI2Keys(user.mobileNumber);
                attributeValues[":gsi2pk"] = gsi2Keys.GSI2PK;
                attributeValues[":gsi2sk"] = gsi2Keys.GSI2SK;
                attributeNames["#gsi2pk"] = "GSI2PK";
                attributeNames["#gsi2sk"] = "GSI2SK";
                updateExpression += '#gsi2pk = :gsi2pk, #gsi2sk = :gsi2sk, ';
            }
        }
    }
    updateExpression = updateExpression.substr(0, updateExpression.length-2)
    return {updateExpression, attributeNames, attributeValues};
}

function deleteSameFields(oldObject, newObject): boolean {
    let updated = false;
    for(const key of getKeys(oldObject)){
        if(key === 'id' || key === 'updatedAt') continue;
        if(oldObject[key] === newObject[key]){
            delete newObject[key];
        }
        if(newObject[key] === undefined) delete newObject[key]
    }
    if(getKeys(newObject).length > 2) updated = true;
    return updated;