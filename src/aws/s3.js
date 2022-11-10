const {
    PutObjectCommand,
    DeleteObjectCommand,
    S3Client,sign
} = require('@aws-sdk/client-s3');

const {createPresignedPost} = require('@aws-sdk/s3-presigned-post')

const client = new S3Client(
    { 
        region: 'us-east-2' ,
        // credentials:{ 
        //     accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
        //     secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
        // }
    }
)
// const bucketName = 'aynitech-rrhh-images'
const bucketName = process.env.BUCKET_IMAGES;

const postUrl = async(params)=>{
    try {
        const {id} = params;
        const payload = {
            Key: id,
            Bucket: bucketName,
            Expires: 600,
        }
        const response = await createPresignedPost( client, payload );
        return response
    } catch (error) {
        console.error('res-err-s3-pos');
        console.error(error);
    }
};

const deleteObject = async (params)=>{
    try {
        const {id} = params
        const payload = {
            Key: id,
            Bucket: bucketName,
        }
        const response = await client.send( new DeleteObjectCommand( payload ) );
        return response
    } catch (error) {
        console.error('res-err-s3-del');
        console.error(error);
    }
    return response;
}

module.exports = {
    deleteObject,
    postUrl,
}