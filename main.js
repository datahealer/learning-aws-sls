const connectDB  = require('./db')
const Employee = require('./Schema')

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
    const e = await Employee.find();
    console.log('i Shivam');
    return {
      statusCode: 200,
      body: JSON.stringify(e),
    };
}  
module.exports.postEmployee = async (event) => {
  // 1. read employee object from event.body
  // 2. conver that into JSON
 // 3. Save in mongoDB
 const employee = new Employee({
  name:JSON.parse(event.body.name),
  Department:JSON.parse(event.body.Department)
 })
 employee.save();
 return {
  statusCode: 200,
  body: JSON.stringify({
      message: "Data Saved"
  }),
};
}




  


