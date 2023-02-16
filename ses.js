const AWS = require('aws-sdk');

const env = require('dotenv');

env.config();

const awsConfig = {
    accessKeyID: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
}

const SES = new AWS.SES(awsConfig);

const sendEmail = async (sendemail) => {
    const email = process.env.FROM_EMAIL;
   

    try{

        const params = {
            Source : email,
            Destination: {
                ToAddresses: [sendemail]
            },
            Message: {
                Subject: {
                    Data:`OTP verification`
                },
                Body: {
                   Html:{
                    Charset: "UTF-8",
                    Data: `Thank you`,
                   },
                },
            },
        };
       const emailsent = await SES.sendEmail(params).promise();

        emailsent()
       .then(data => {
        console.log("Email sent successfully", data);
       })
       .catch(err => {
        console.log(err);
       })
    }
    catch(error){
     console.log(error)
    }
}

module.exports = sendEmail;