const connectDB  = require('./db')
const Employee = require('./Schema')
const sendEmail = require('./ses.js');

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
  const employee = JSON.parse(event.body);
  const {name, Department, Email} = employee;
  const emp = new Employee({
    name,
    Department,
    Email
  })
  
  const data =  await emp.save();
  sendEmail();
 return {
  statusCode: 200,
  body: JSON.stringify({
      message: "Data Saved",
      data
  }),
};
}




  


