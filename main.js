"use strict";
require("dotenv").config();
const connectDB = require("./config/db");
const employee = require("./models/employee");
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

    const{id,name,department} =JSON.parse(event.body);
    const createemployee =new employee({
      id,
      name,
      department,
    });
    await createemployee.save();
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



