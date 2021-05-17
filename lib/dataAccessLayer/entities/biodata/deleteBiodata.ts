import { TransactWriteItem, TransactWriteItemsCommand, TransactWriteItemsInput } from '@aws-sdk/client-dynamodb';
import { generateDelTransactItem } from '../../utils/utils';
import {
    AddressType,
    EducationDegree
} from '../../utils/aliases';
import {
    generateADKeys,
    generateBIKeys,
    generateBiodataPrimaryKeys,
    generateCIKeys,
    generateEIKeys,
    generateEQKeys,
    generateFIKeys,
    generateMIKeys,
    generatePIKeys, generatePQKeys
} from '../../utils/generateKeys';
import dynamoDBClient from '../../utils/getDynamoDBClient';
import { getKeys } from '../../../scripts/utils/utils';

export default async function(userId: string): Promise<boolean> {
    let items: TransactWriteItem[] = [];
    console.assert(userId !== undefined);

    const primaryKeys = generateBiodataPrimaryKeys(userId);

    const biodataItem: TransactWriteItem = generateDelTransactItem(primaryKeys.PK, primaryKeys.SK);


    let adItems: TransactWriteItem[] = [];
    for (const addressType of getKeys(AddressType)) {
        const adPrimaryKeys = generateADKeys(userId, addressType);
        adItems.push(generateDelTransactItem(adPrimaryKeys.PK, adPrimaryKeys.SK));
    }

    let eqItems: TransactWriteItem[] = [];
    for (const degree of getKeys(EducationDegree)) {
        const eqPrimaryKeys = generateEQKeys(userId, degree);
        eqItems.push(generateDelTransactItem(eqPrimaryKeys.PK, eqPrimaryKeys.SK));
    }

    const biPrimaryKeys = generateBIKeys(userId);
    const biItem: TransactWriteItem = generateDelTransactItem(biPrimaryKeys.PK, biPrimaryKeys.SK);
    const ciPrimaryKeys = generateCIKeys(userId);
    const ciItem = generateDelTransactItem(ciPrimaryKeys.PK, ciPrimaryKeys.SK);
    const eiPrimaryKeys = generateEIKeys(userId);
    const eiItem: TransactWriteItem = generateDelTransactItem(eiPrimaryKeys.PK, eiPrimaryKeys.SK);
    const fiPrimaryKeys = generateFIKeys(userId);
    const fiItem: TransactWriteItem = generateDelTransactItem(fiPrimaryKeys.PK, fiPrimaryKeys.SK);
    const pqPrimaryKeys = generatePQKeys(userId);
    const pqItem: TransactWriteItem = generateDelTransactItem(pqPrimaryKeys.PK, pqPrimaryKeys.SK);
    const miPrimaryKeys = generateMIKeys(userId);
    const miItem: TransactWriteItem = generateDelTransactItem(miPrimaryKeys.PK, miPrimaryKeys.SK);
    const piPrimaryKeys = generatePIKeys(userId);
    const piItem: TransactWriteItem = generateDelTransactItem(piPrimaryKeys.PK, piPrimaryKeys.SK)

    items.push(biodataItem, biItem, ciItem, eiItem, fiItem, pqItem, miItem, piItem, ...adItems, ...eqItems);
    console.assert(items.length <= 25);

    const params: TransactWriteItemsInput = {
        TransactItems: items
    }

    const command = new TransactWriteItemsCommand(params);

    try {
        const response = await dynamoDBClient.send(command);
        console.log(response);
        return true;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
