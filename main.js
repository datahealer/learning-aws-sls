const connectDB = require("./db");
const Empolyee = require("./schema");

connectDB();

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v2.0! Your function executed successfully!",
    }),
  };
};

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
    const { name, department } = parsedEmpolyeData;
    console.log(name, department);
    const employee = new Empolyee({
      name,
      department,
    });
    const empoly = await employee.save();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "user saved",
        data: empoly,
      }),
    };
  } catch (error) {
    return {
      statusCode: 501,
      body: JSON.stringify({
        message: err.message,
      }),
    };
  }
};
