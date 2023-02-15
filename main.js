"use strict";

const connectDB = require("./config/db")
const Emp =require("./model/Emp")
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

  const {Employee,department}=JSON.parse(event.body)

  const emp=new Emp({
    Employee,
    department
  })

  const data = await emp.save()

    // 1. read employee object from event.body
    // 2. conver that into JSON
    // 3. Save in mongoDB

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Data Saved",
            data,

        }),
      };
}


