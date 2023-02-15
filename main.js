"use strict";

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


