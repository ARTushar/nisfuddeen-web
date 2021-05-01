import User from '../../../models/user/User';
import {
    TransactWriteItemsCommand,
    TransactWriteItemsCommandInput,
    TransactWriteItem
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../dynamodbConfig';
import dynamoDBClient from '../../core/getDynamoDBClient';
import { userAliasAttributes } from '../../utils/aliases';
import { checkUniquePK } from '../../../utils/dynoUtils';
import { getUserById } from './getUser';

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
    deleteSameFields(oldUser, user);

    const updatedVals = generateUpdateAttributes(user)

    console.log("--updating user " + JSON.stringify(user, null, 2));
    console.log("--updated vals " + JSON.stringify(updatedVals, null, 2));

    const oldEmailItem: TransactWriteItem = {
        Delete: {
            TableName: DynamodbConfig.tableName,
            Key: marshall({
                PK: "USER#EMAIL#" + oldUser.email,
                SK: "USER#EMAIL#" + oldUser.email,
            })
        }
    }

    const oldMobileItem: TransactWriteItem = {
        Delete: {
            TableName: DynamodbConfig.tableName,
            Key: marshall({
                PK: "USER#MOBILE#" + oldUser.mobileNumber,
                SK: "USER#MOBILE#" + oldUser.mobileNumber,
            })
        }
    }

    const emailItem: TransactWriteItem = {
        Put: {
            TableName: DynamodbConfig.tableName,
            Item: marshall({
                PK: "USER#EMAIL#" + user.email,
                SK: "USER#EMAIL#" + user.email,
                _tp: "UserMobile"
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

    const userItem: TransactWriteItem = {
        Update: {
            TableName: DynamodbConfig.tableName,
            Key: marshall({
                PK: "USER#ID#" + user.id,
                SK: "USER#ID#" + user.id,
            }),
            UpdateExpression: updatedVals.updateExpression,
            ExpressionAttributeNames: updatedVals.attributeNames,
            ExpressionAttributeValues: marshall(updatedVals.attributeValues, {removeUndefinedValues: true})
        }
    }
    let items: TransactWriteItem[] = [userItem];
    if(user.email && (oldUser.email && oldUser.email !== user.email)) {
        items.push(emailItem);
        if(oldUser.email) items.push(oldEmailItem);
    }
    if(user.mobileNumber && (oldUser.mobileNumber && oldUser.mobileNumber !== user.mobileNumber)) {
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
        if(key === "userId" || key === 'createdAt') continue;
        if(user.hasOwnProperty(key) && user[key] !== undefined){
            const alias = userAliasAttributes[key];
            const av = ':' + alias;
            const an = '#' + alias;
            attributeValues[av] = user[key];
            attributeNames[an] = alias;
            updateExpression += `${an} = ${av}, `
            if(key === 'email') {
                attributeValues[":gsi1pk"] = "USER#EMAIL#" + user.email;
                attributeValues[":gsi1sk"] = "USER#EMAIL#" + user.email;
                attributeNames["#gsi1pk"] = "GSI1PK";
                attributeNames["#gsi1sk"] = "GSI1SK";
                updateExpression += '#gsi1pk = :gsi1pk, #gsi1sk = :gsi1sk, ';
            }
            if(key === 'mobileNumber') {
                attributeValues[":gsi2pk"] = "USER#MOBILE#" + user.mobileNumber;
                attributeValues[":gsi2sk"] = "USER#MOBILE#" + user.mobileNumber;
                attributeNames["#gsi2pk"] = "GSI2PK";
                attributeNames["#gsi2sk"] = "GSI2SK";
                updateExpression += '#gsi2pk = :gsi2pk, #gsi2sk = :gsi2sk, ';
            }
        }
    }
    updateExpression = updateExpression.substr(0, updateExpression.length-2)
    return {updateExpression, attributeNames, attributeValues};
}

function deleteSameFields(oldObject, newObject) {
    for(const key in oldObject){
        if(key === 'userId') continue;
        if(oldObject.hasOwnProperty(key) && newObject.hasOwnProperty(key)){
            if(oldObject[key] === newObject[key]){
                delete newObject[key];
            }
        }
    }
}