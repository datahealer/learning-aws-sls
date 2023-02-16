const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    name: String,
    Department: Number,
    Email: String
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;