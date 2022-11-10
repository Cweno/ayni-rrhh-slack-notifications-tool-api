const {
    deleteObject, 
    postUrl,
} = require('../../aws/s3');

const deletePicture = async (params)=>{
    try {
        const {id} = params;
        const res = await deleteObject( 
            {
                id
            } 
        );
        return {
            id,
            upload: res
        }
    } catch (error) {
        console.error(error);
    }
}

const presignedPostURL = async(params)=>{
    try {
        const {id} = params;
        const res = await postUrl( 
            {
                id
            } 
        );
        return {
            id,
            postUrl: res
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports={
    deletePicture,
    presignedPostURL,
}