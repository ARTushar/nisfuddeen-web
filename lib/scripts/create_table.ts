#!/usr/bin/env ts-node

import createGlobalSecondaryIndex from '../dataAccessLayer/core/createGlobalSecondaryIndex';
import createTable from '../dataAccessLayer/core/createTable';

const globalIndexes = [
    createGlobalSecondaryIndex({
        indexName: 'GSI1', primaryKey: 'GSI1PK', sortKey: 'GSI1SK'
    }),
    createGlobalSecondaryIndex({
        indexName: 'GSI2', primaryKey: 'GSI2PK', sortKey: 'GSI2SK'
    })
];

const indexAttributes: string[] = ['GSI1PK', 'GSI1SK', 'GSI2PK', 'GSI2SK'];


(async () => {
    console.log(JSON.stringify(globalIndexes, null ,2));
    try {
        const response = await createTable('PK', 'SK', indexAttributes, globalIndexes);
        console.log(response)
    } catch (e) {
        console.log(e);
    }
})();
