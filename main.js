"use strict";
require("dotenv").config();
const env = require("dotenv");
const connectDB = require("./config/db");
const employee = require("./models/employee");
const AWS = require("aws-sdk");
const { eventNames } = require("./models/employee");

env.config();
const awsConfig = {
  accessKeyId : "AKIATLGYA7EVDABHFMM5",
  secretAccessKey : "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",
  region: "ap-northeast-1"
}
const SES  = new AWS.SES (awsConfig);
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
  const e = await employee.find();
    // const e = await readfromDB()
    return {
        statusCode: 200,
        body: JSON.stringify(e),
      };
};

module.exports.postEmployee = async (event) => {
  // try{

   
    const email = process.env.FROM_EMAIL;
  try{
    const{id,name,department,EMAIL} =JSON.parse(event.body);
    const createemployee =new employee({
      id,
      name,
      department,
      EMAIL,

    });
    await createemployee.save();
  const params ={
    Source: email,
    Destination :{
      ToAddresses : [EMAIL],
    },
    Message: {
      Subject : {
        Charset : "UTF-8",
        Data : "Welcome to Inzint.",
      },
      Body :{
        Html:{
          Charset : "UTF-8",
          Data: `<h1> Hii, Welcome to our Team With regards Hardik Garg</h1>`,
        },
      },
    },
  };
  const emailSent = await  SES.sendEmail(params).promise()
  .then(data => {
    data
  })
    .catch(error =>{
      error.message

    
  })
} catch(error){
  error;
}

    return "Employee posted Successfully";
  
  // }
  // catch(err){
  //   res.json({
  //     message:err.message,
  //   });
  // };
    // 1. read employee object from event.body
    // 2. conver that into JSON
    // 3. Save in mongoDB
   
};



