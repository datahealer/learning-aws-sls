const mongoose=require("mongoose");
mongoose.set('strictQuery', false);

const PortalSchema = new mongoose.Schema({

    ID:{
        required : true,
        type : "String",
        unique : true
    },

    Name:{
        required : true,
        type : "String"
    },
    Department:{
        required : true,
        type : "String"
    }
    
});

const Portal = mongoose.model("portal", PortalSchema);

module.exports = Portal;