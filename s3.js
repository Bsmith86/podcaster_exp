const aws = require('aws-sdk');


const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
// IAM


 function getFileStream(fileKey) {
    const downloadParams = {
        Key: "e40ac243-e2a0-4e0c-bb2b-b392a1c084a7",
        Bucket: process.env.BUCKET,
    }
    // return s3.getObject(downloadParams, (err, data) => {
    //     console.log(data)
    // }).createReadStream()
    // return object.createReadStream()
    return s3.getObject(downloadParams).createReadStream()
}

exports.getFileStream = getFileStream