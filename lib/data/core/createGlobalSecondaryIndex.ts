import { GlobalSecondaryIndex } from '@aws-sdk/client-dynamodb';


interface CreateGlobalSecondaryIndex {
    indexName: string;
    primaryKey: string;
    sortKey: any;
    attributes: string[];
}

const createGlobalSecondaryIndex = ({indexName, primaryKey, sortKey, attributes}: CreateGlobalSecondaryIndex): GlobalSecondaryIndex => {
    return {
        IndexName: indexName,
        KeySchema: [
            {AttributeName: primaryKey, KeyType: 'HASH'},
            {AttributeName: sortKey, KeyType: 'RANGE'}
        ],
        Projection: {
            ProjectionType: 'INCLUDE',
            NonKeyAttributes: attributes
        },
    }
}

export default createGlobalSecondaryIndex;