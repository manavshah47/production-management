const { truncate } = require("fs");
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const employeeSchema = new mongoose.Schema({
    
    shallno : {
        type:String,
        required:true,
        unique:true
    },

    plan : {
        type:String,
        required:true
    },

    remark : {
        type:String,
    },

    status : {
        type:String,
    },
})

const finaluser = mongoose.model('finalstation', employeeSchema)
employeeSchema.plugin(uniqueValidator);
module.exports = finaluser;