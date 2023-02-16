"use strict";

const connectDB = require("./config/db")
const Emp = require("./model/Emp")
const aws = require("aws-sdk")
const awsconfig = {
  accessKeyId: "AKIATLGYA7EVHGXXPQKY",
  secretAceesKey: "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",
  region: "ap-northeast-1",
};
const SES = new aws.SES(awsconfig)
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
  const e = await Emp.find();

  // const e = await readfromDB()
  return {
    statusCode: 200,
    body: JSON.stringify(e),
  };
}

module.exports.postEmployee = async (event) => {
  try {
    const { Employee, department, email } = JSON.parse(event.body)

    const emp = new Emp({
      email,
      Employee,
      department
    })

    const data = await emp.save()

    const params = {
      Source: "sushma@inzint.com",
      Destination: {
        ToAddresses: [email]

      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `Welcome ${Employee}`
          }
        },
        Subject: {
          Data: "Your Verified",
        }

      }
    }


    await SES.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: emp,
        message: "email sent succesfully",
      })
    };
  }
  catch (err) {
    return {
      statusCode: 501,
      body: JSON.stringify({
        message: err.message,
      })
    }
  }
}



