const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    name:{
        type:"String",
        required: true
    },
    department:{
        type:"String",
        required: true,
    },
});
const Post = mongoose.model("employee",PostSchema);
module.exports = Post;