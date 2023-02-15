"use strict";
require("dotenv").config();
const connectDB = require("./config/db");
const Emp = require("./model/user");
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
    // 1. read employee object from event.body
    // 2. conver that into JSON
    // 3. Save in mongoDB
  const{ID,Name,Department}=JSON.parse(event.body);
    
  
    const createUser = new Emp({
      ID,
      Name,
      Department
    });
  const data = await createUser.save(); 


}
