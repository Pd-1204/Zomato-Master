import AWS from "aws-sdk";

const s3Bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
    region:"ap-south-1"

});

export const s3Upload=(options)=>{
    return new Promise((resolve, reject)=>
    s3Bucket.upload(options,(error, data)=>{
        if (error) {
            return reject(error);
        }
        else{
            return resolve(data);
        }
    } )
    )
}