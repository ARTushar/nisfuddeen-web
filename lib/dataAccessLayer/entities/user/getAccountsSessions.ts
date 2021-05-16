import { QueryCommand, QueryCommandInput, QueryCommandOutput } from '@aws-sdk/client-dynamodb';
import DynamodbConfig from '../../utils/dynamodbConfig';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import dynamoDBClient from '../../utils/getDynamoDBClient';
export async function getAccountsSessionsById(userId: string): Promise<Object[]> {

    const params: QueryCommandInput = {
        TableName: DynamodbConfig.tableName,
        IndexName: "GSI1",
        KeyConditionExpression: '#PK = :pk',
        ExpressionAttributeNames: {
            "#PK": "GSI1PK",
        },
        ExpressionAttributeValues: marshall({
            ":pk": "USER#ID#" + userId,
        }),
        // ProjectionExpression: '',
    }
    const command = new QueryCommand(params);
    let outputs = []
    try {
        const response: QueryCommandOutput = await dynamoDBClient.send(command)
        console.log(response);
        for(const item of response.Items){
            outputs.push(unmarshall(item))
        }
        return outputs;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
