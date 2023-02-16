const AWS = require('aws-sdk');

const env = require('dotenv');
env.config();

const awsConfig = {
    accessKeyId : process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
}

const SES  = new AWS.SES(awsConfig)

const sendEmail = async () => {
    const email = process.env.FORM_EMAIL
    const shortCode = "121212"

    try{

        // prepare email to send
        const params = {
            Source: email,
            Destination:{
                ToAddresses: ["hardik@inzint.com"]
            },
            Message: {
                Subject:{
                    Data: `OTP Verification`
                },
                Body:{
                    Html: {
                        Charset: "UTF-8",
                        Data: `<h1>Your verification code is ${shortCode}</h1>`
                    },
                },
            },
        };
     const emailSent = await SES.sendEmail(params).promise().then(data => {
        console.log(data);
    });
     
    }catch(error){
        console.log(error);
    }
}

module.exports = sendEmail;