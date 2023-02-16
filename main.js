"use strict";
require("dotenv").config();
const connectDB = require("./config/db");
const Emp = require("./model/user");
const AWS = require("aws-sdk");
const awsConfig ={
  accessKeyId :"AKIATLGYA7EVDABHFMM5",
  secretAccessKey:"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",
  region:"ap-northeast-1"
}

const SES = new AWS.SES(awsConfig)

connectDB();
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

    const e=await Emp.find();

    return {
        statusCode: 200,
        body: JSON.stringify(e),
      };
}

module.exports.postEmployee = async (event) => {

  const email=process.env.FROM_EMAIL;
  
  try{
    const{ID,Name,Department,Email}=JSON.parse(event.body);
    const createUser = new Emp({
      ID,
      Name,
      Department,
      Email
    });
  await createUser.save();
      
  const params = {
        Source:email,
        Destination:{
          ToAddresses:[Email],
      },
      Message:{
          Subject:{
            Data:"Welcome to INZINT",
          },
          Body:{
            Html: {
             Charset:"UTF-8",
              Data:`<h1>Hi ${Name} your ID:${ID} and Department is ${Department}.</h1>`
            },
          },
        },
      };
      const emailSent= await SES.sendEmail(params).promise()
      .then(data =>{
        data.MessageId
      })
      .catch(err =>{
        err.message
      })

      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            emailSent,
            
          }),
      };
    
    }
  catch(error){
    return error;
  } 
  
};