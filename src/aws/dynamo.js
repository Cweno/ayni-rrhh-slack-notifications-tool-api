const {marshall, unmarshall} = require('@aws-sdk/util-dynamodb');
const uuidv4 = require('uuid').v4
const {
    ScanCommand, 
    PutItemCommand, 
    UpdateItemCommand,
    DeleteItemCommand,
    DynamoDBClient,
} = require('@aws-sdk/client-dynamodb')

cfg = new DynamoDBClient().config
 
const client = new DynamoDBClient(
    {
        region: 'us-east-2',
        // credentials:{ 
        //     accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
        //     secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
        // }
    }
);

const loadItems = async (tableName)=>{
    try {
        const payload = {
            TableName : tableName,
        }
        const results = await client.send( new ScanCommand( payload ) );
        return results.Items.map( (item)=>unmarshall(item) )
    } catch (error) {
        console.error(error);
    }
};

const insertItem = async(tableName, params)=>{
    try {
        const id = uuidv4();
        const item = marshall(
            {
                ...{id},
                ...params
            }
        ) 

        const payload = {
            TableName: tableName,
            Item: item
        }
        await client.send( new PutItemCommand( payload ) );
        return {id}
    } catch (error) {
        console.error(error);
    }
};

const updateItem = async(tableName, info)=>{
    try {

        // info
        // {
        //     id,
        //     params: [ 'name', 'day', 'month', 'slackId' ],
        //     shortNames: [ ':n', ':d', ':m', ':sid' ],
        //     data: { name: 'pepe', month: 10, day: 30, slackId: 'UUUUEEE' },
        // }

        const {shortNames, params, data, id} = info;
        // get ExpressionAttributeNames
        const ExpressionAttributeNames = {};
        params.map(param => ExpressionAttributeNames[`#${param}`] = param);
        // set ExpressionAttributeValues
        const ExpressionAttributeValues = {};
        [
            ...Array(shortNames.length).keys()
        ]
        .map(i => ExpressionAttributeValues[shortNames[i]] = data[params[i]]);

        // set UpdateExpression
        const UpdateExpression = 'SET ' + 
        [
            ...Array(shortNames.length).keys()
        ]
        .map(i => `#${params[i]} = ${shortNames[i]}`).join(', ')

        const payload = {
            TableName: tableName,
            Key: marshall({
                    id
                }
            ),
            UpdateExpression,
            ExpressionAttributeNames,
            ExpressionAttributeValues: marshall(ExpressionAttributeValues),
        }

        const res = await client.send( new UpdateItemCommand( payload ) );
        return {
            id,
            update: res
        };
        
    } catch (error) {
        console.error(error);
    }
};

const deleteItem = async(tableName, params)=>{
    try {
        const {id} = params;
        const payload = {
            TableName: tableName,
            Key: marshall(
                {
                    id
                }
            )
        }
        const res = await client.send( new DeleteItemCommand( payload ) );
        return {
            id,
            delete: res
        };
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    loadItems,
    insertItem,
    updateItem,
    deleteItem,
}