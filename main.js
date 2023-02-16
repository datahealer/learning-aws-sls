const connectDB = require("./db");
const Empolyee = require("./schema");
require("dotenv").config();

const AWS = require("aws-sdk");

const awsConfig = {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
};

const SES = new AWS.SES(awsConfig);

connectDB();

module.exports.getEmployees = async (event) => {
  const e = await Empolyee.find();

  return {
    statusCode: 200,
    body: JSON.stringify(e),
  };
};

module.exports.postEmployee = async (event) => {
  try {
    const parsedEmpolyeData = JSON.parse(event.body);
    const { name, department, email } = parsedEmpolyeData;
    console.log(name, department);
    const employee = new Empolyee({
      name,
      department,
      email,
    });
    const empoly = await employee.save();
    const fromEmail = process.env.from;
    const params = {
      Source: fromEmail,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: `Welcome To inzint`,
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<h1>Thanks ${name} for joining Our Organization.</h1>`,
          },
        },
      },
    };

    const messageId = await SES.sendEmail(params)
      .promise()
      .then((data) => data.MessageId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "user saved",
        data: empoly,
        message: "email sent succesfully",
        messageId,
      }),
    };
  } catch (error) {
    return {
      statusCode: 501,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};

module.exports.sentMailToEmployee = async (event) => {
  try {
    const parsedEmpolyeData = JSON.parse(event.body);
    const { message, email } = parsedEmpolyeData;

    const fromEmail = process.env.from;
    const params = {
      Source: fromEmail,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: `mail From paras`,
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<h1>${message}</h1>`,
          },
        },
      },
    };

    const messageId = await SES.sendEmail(params)
      .promise()
      .then((data) => data.MessageId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "email sent succesfully",
        messageId,
      }),
    };
  } catch (error) {
    return {
      statusCode: 501,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
