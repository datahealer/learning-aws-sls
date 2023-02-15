const mongoose = require("mongoose");

const connectDB = async () => {
    try {
      
      await mongoose.connect("mongodb+srv://chitresh_kumar:XYZ123@cluster0.ct9yudo.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("MongoDB is connected");
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
module.exports = connectDB;