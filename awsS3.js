const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');


const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: 'AKIAQQWG4D6JE3U3KWFS',
        secretAccessKey: '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'
    }
})

const uploadFileToS3 = async(file, key) => {
    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: 'streamflic',
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        },
        queueSize: 4,
        partSize: 5 * 1024 * 1024,
    });
    try{
       const result = await upload.done();
       return `https://d1vmg8nlfiebex.cloudfront.net/${key}` 
    }catch(error){
        console.error('Error uploading file:', error);
        throw error
    }
}

module.exports = uploadFileToS3;