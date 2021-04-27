import {
    GetItemCommand,
    GetItemCommandInput,
    GetItemCommandOutput,
    QueryCommand,
    QueryCommandInput, QueryCommandOutput
} from '@aws-sdk/client-dynamodb';
import User from '../../../models/user/User';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../dynamodbConfig';
import dynamoDBClient from '../../core/getDynamoDBClient';

export async function  getUserById(userId: string): Promise<User> {
    const params: GetItemCommandInput = {
        Key: marshall({
            PK: "USER#" + userId,
            SK: "USER#" + userId
        }),
        ProjectionExpression: '', // TO DO: add required attributes
        TableName: DynamodbConfig.tableName
    }
    const command = new GetItemCommand(params);

    try {
        const response: GetItemCommandOutput = await dynamoDBClient.send(command)
        if(response.Item){
            const user = unmarshall(response.Item);
            return userFactory(user);
        }
        return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function getUserByEmail(email: string): Promise<User> {
    const params: QueryCommandInput = {
        IndexName: 'GSI1',
        KeyConditionExpression: '#gsi1pk = :gsi1pk AND #gsi1sk = :gsi1sk',
        ExpressionAttributeNames: {
            "#gsi1pk": "GSI1PK",
            "#gsi1sk": "GSI1SK"
        },
        ExpressionAttributeValues: marshall({
            ":gsi1pk": "USER#" + email,
            ":gsi1sk": "USER#" + email,
        }),
        // ProjectionExpression: '', // TO DO: add required attributes
        TableName: DynamodbConfig.tableName
    }

    const command = new QueryCommand(params);
    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command)
        console.log(response)
        if(response.Items.length == 1){
            const user = unmarshall(response.Items[0]);
            return userFactory(user);
        }
        return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function getUserByMobile(mobile: string): Promise<User> {
    const params: QueryCommandInput = {
        IndexName: 'GSI2',
        KeyConditionExpression: '#gsi2pk = :gsi2pk AND #gsi2sk = :gsi2sk',
        ExpressionAttributeNames: {
            "#gsi2pk": "GSI2PK",
            "#gsi2sk": "GSI2SK"
        },
        ExpressionAttributeValues: marshall({
            ":gsi2pk": "USER#" + mobile,
            ":gsi2sk": "USER#" + mobile,
        }),
        // ProjectionExpression: '', // TO DO: add required attributes
        TableName: DynamodbConfig.tableName
    }
    const command = new QueryCommand(params);
    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command)
        if(response.Items.length == 1){
            const user = unmarshall(response.Items[0]);
            return userFactory(user);
        }
        return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

function userFactory(user): User {
    return new User({
        accountType: user.ac,
        createdAt: user._ca,
        email: user.em,
        fullName: user.fn,
        mobileNumber: user.mb,
        subscriptionType: user.st,
        updatedAt: user._ua,
        userId: user.id,
        password: user.ha
    });
}