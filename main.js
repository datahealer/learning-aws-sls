"use strict";
const AWS3 =  require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const crypto = require('crypto')

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v2.0! Your function executed successfully!",
      }),
  };
};

module.exports.getEmployees = async (event) => {
    const e = [
        {id:1, name: "Chitransh", department: 1},
        {id:2, name: "Sushma", department: 1},
        {id:3, name: "Paras", department: 1},
        {id:4, name: "Shivam", department: 1},
        {id:5, name: "Hardik", department: 1},
        {id:6, name: "Saksham", department: 1},
    ]
    // const e = await readfromDB()
    return {
        statusCode: 200,
        body: JSON.stringify(e),
      };
}

module.exports.postEmployee = async (event) => {
    // 1. read employee object from event.body
    // 2. conver that into JSON
    // 3. Save in mongoDB
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Data Saved"
        }),
      };
}

/***
 * @params file : { fileName: string; fileType: string }
 * @params bkt bucketName: string
 */

module.exports.getPreSignedUrl = async (event) => {
  // console.log(event)
  const s3v3 = new AWS3.S3Client({
    region: 'your-s3-region',
    credentials: {
      accessKeyId: 'you-can-use-your-access-key',
      secretAccessKey: 'you-can-use-your-secret-key',
    },
  });

  const bkt = 'pbt-website-images';

  const { fileName, fileType } = JSON.parse(event.body);
  console.log(fileName,fileType)
  const AllowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
  if (!AllowedTypes.includes(fileType)) {
    const response = { status: 'failed', message: 'File type not allowed'};
    return response;
  }
  const fileDetails = fileName.split('.');
  const actionId = `${crypto.randomUUID()}`;
  const key = `${actionId}.${fileDetails[1]}`;

  const bucketParams = {
    Bucket: bkt,
    Key: key,
    ContentType: fileType,
    ACL: 'public-read',
  };
 

  try {
    // Create a command to put the object in the S3 bucket.
    const command = new AWS3.PutObjectCommand(bucketParams);
    // Create the presigned URL.
    const signedUrl = await getSignedUrl(s3v3, command, {
      expiresIn: 3600,
    });
    const data = { status: 'success', signedUrl, bkt, key };
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    const data = { status: 'failed', message: 'Something Went wrong' };
    return {
      statusCode: 500,
      body: JSON.stringify(data),
    };
  }
}


