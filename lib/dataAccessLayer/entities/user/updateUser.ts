import User from '../../../models/user/User';
import { UpdateItemCommand, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../dynamodbConfig';
import dynamoDBClient from '../../core/getDynamoDBClient';
import { userAliasAttributes } from '../../utils/aliases';

export async function updateUser(user: User): Promise<User> {
    user.updatedAt = new Date().toISOString();
    const updatedVals = generateUpdateAttributes(user)

    const params: UpdateItemCommandInput = {
        TableName: DynamodbConfig.tableName,
        Key: marshall({
            PK: "USER#ID#" + user.userId,
            SK: "USER#ID#" + user.userId,
        }),
        UpdateExpression: updatedVals.updateExpression,
        ExpressionAttributeNames: updatedVals.attributeNames,
        ExpressionAttributeValues: marshall(updatedVals.attributeValues)
    }
    const command = new UpdateItemCommand(params);

    try {
        const response = dynamoDBClient.send(command);
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
        if(user.hasOwnProperty(key)){
            const alias = userAliasAttributes[key];
            const av = ':' + alias;
            const an = '#' + alias;
            attributeValues[av] = user[key];
            attributeNames[an] = alias;
            updateExpression += `${an} = ${av}, `
            if(key === 'email') {
                attributeValues[":gsi1pk"] = "USER#EMAIL#" + user.email;
                attributeValues[":gsi1sk"] = "USER#EMAIL#" + user.email;
                attributeNames["#gsi1pk"] = "gsi1pk";
                attributeNames["#gsi1sk"] = "gsi1sk";
                updateExpression += '#gsi1pk = :gsi1pk, #gsi1sk = :gsi1sk, ';
            }
            if(key === 'mobileNumber') {
                attributeValues[":gsi2pk"] = "USER#MOBILE#" + user.mobileNumber;
                attributeValues[":gsi2sk"] = "USER#MOBILE#" + user.mobileNumber;
                attributeNames["#gsi2pk"] = "gsi12k";
                attributeNames["#gsi2sk"] = "gsi12k";
                updateExpression += '#gsi2pk = :gsi2pk, #gsi2sk = :gsi2sk, ';
            }
        }
    }
    return {updateExpression, attributeNames, attributeValues};
}