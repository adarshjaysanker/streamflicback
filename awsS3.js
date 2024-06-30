const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const dotenv = require('dotenv');

dotenv.config();


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

const uploadFileToS3 = async(file, key) => {
    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: process.env.AWS_BUCKET_NAME,
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