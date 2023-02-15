const connectDB = require("./config/db");
const Post = require('./model/postSchema')

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
    const e =await Post.find();
    
    return {
        statusCode: 200,
        body: JSON.stringify(e),
      };
}

module.exports.postEmployee = async (event) => {
 
    const {name, department}=JSON.parse(event.body)

    const employ = new Post({
      name,
      department
    })
    const data =await employ.save();
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Data Saved",
            data
        }),
      };
}


