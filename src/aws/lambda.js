const {LambdaClient, InvokeCommand } =require("@aws-sdk/client-lambda");

const functionName = 'slack-notfications-bot';
const client = new LambdaClient(
    {
        region: 'us-east-2',
        // credentials:{ 
        //     accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
        //     secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
        // }
    }
);

const triggerLambda = async (data) =>{
    try {
        const payload = {
            FunctionName: functionName,
            Payload : JSON.stringify(data)
        }
        const response = await client.send( new InvokeCommand( payload ) );
        return response;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    triggerLambda
}