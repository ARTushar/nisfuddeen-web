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
import { userFactory } from '../../utils/factory';

export async function  getUserById(userId: string): Promise<User> {
    const params: GetItemCommandInput = {
        Key: marshall({
            PK: "USER#ID#" + userId,
            SK: "USER#ID#" + userId
        }),
        // ProjectionExpression: '', TODO: add required attributes
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
        throw e;
    }
}

export async function getUserByEmail(email: string): Promise<User> {
    console.log("email: " + email)
    const params: QueryCommandInput = {
        IndexName: 'GSI1',
        KeyConditionExpression: '#pk = :pk AND #sk = :sk',
        ExpressionAttributeNames: {
            "#pk": "GSI1PK",
            "#sk": "GSI1SK"
        },
        ExpressionAttributeValues: marshall({
            ":pk": "USER#EMAIL#" + email,
            ":sk": "USER#EMAIL#" + email,
        }),
        // ProjectionExpression: '', // TODO: add required attributes
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
        throw e;
    }
}

export async function getUserByMobile(mobile: string): Promise<User> {
    const params: QueryCommandInput = {
        IndexName: 'GSI2',
        KeyConditionExpression: '#pk = :pk AND #sk = :sk',
        ExpressionAttributeNames: {
            "#pk": "GSI2PK",
            "#sk": "GSI2SK"
        },
        ExpressionAttributeValues: marshall({
            ":pk": "USER#MOBILE#" + mobile,
            ":sk": "USER#MOBILE#" + mobile,
        }),
        // ProjectionExpression: '', // TODO: add required attributes
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
        throw e
    }
}