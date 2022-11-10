const {marshall, unmarshall} = require('@aws-sdk/util-dynamodb');
const uuidv4 = require('uuid').v4
const {
    ScanCommand, 
    PutItemCommand, 
    UpdateItemCommand,
    DeleteItemCommand,
    DynamoDBClient
} = require('@aws-sdk/client-dynamodb')

const client = new DynamoDBClient({region: 'us-east-2'});
const tableName = 'aynitech_birthday_profiles'

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

const insertItem = async(params)=>{
    try {
        const {name,day,month,slackId} = params
        const id = uuidv4();
        const item = marshall(
            {
                id,
                name,
                day,
                month,
                slackId,
            }
        )
        const payload = {
            TableName: tableName,
            Item: item
        }
        await client.send( new PutItemCommand( payload ) );
        // const response = id;
        return {id}
    } catch (error) {
        console.error(error);
    }
};

const updateItem = async(params)=>{
    try {
        const {id,name,day,month,slackId} = params
        const payload = {
            TableName: tableName,
            Key: marshall(
                {
                    id
                }
            ),
            UpdateExpression: "SET #name = :n, #day = :d, #month = :m, #slackId = :sid",
            ExpressionAttributeNames: {
                '#name'     : 'name',
                '#day'      : 'day',
                '#month'    : 'month',
                '#slackId'  : 'slackId',
            },
            ExpressionAttributeValues: marshall(
                {
                    ':n' : name,
                    ':m' : month,
                    ':d' : day,
                    ':sid' : slackId,
                }
            ),
        }
        const x = await client.send( new UpdateItemCommand( payload ) );
        const response = { new: x };
        return {response}
    } catch (error) {
        console.error(error);
    }
};

const deleteItem = async(params)=>{
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
        await client.send( new DeleteItemCommand( payload ) );
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