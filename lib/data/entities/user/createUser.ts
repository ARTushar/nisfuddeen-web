import { User } from '../../../models/user/User';
import dynamoDBClient from '../../core/getDynamoDBClient';
import {
    TransactGetItemsCommandOutput,
    TransactWriteItem,
    TransactWriteItemsCommand,
    TransactWriteItemsCommandInput
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import DynamodbConfig from '../../dynamodbConfig';
import { generateID } from '../../../utils/helpers';
import { hashPassword } from '../../../utils/passwordHelpers';
import { checkUniquePK } from '../../../utils/dynoUtils';


const createUser = async (user: User): Promise<TransactGetItemsCommandOutput> => {
    const userId = generateID();
    const passwordHash = hashPassword(user.password);
    const items: TransactWriteItem[] = [
        {
            Put: {
                TableName: DynamodbConfig.tableName,
                Item: marshall({
                    PK: "USER" + "#" + userId,
                    SK: "USER" + "#" + userId,
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

    return await dynamoDBClient.send(command)
}