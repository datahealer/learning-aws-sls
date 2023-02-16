const mongoose=require("mongoose")
const EmpSchema= new mongoose.Schema({

    email:{
        type:"String",
        required:true
    },

    
    Employee:{
        type:"String",
        required:true,
    },
    department:
    {
        type:"String",
        require:true,
    }

})

const Emp = mongoose.model("emp", EmpSchema);
module.exports = Emp;
