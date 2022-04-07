const mongoose= require("mongoose");

const peopleSchema= new mongoose.Schema({
   firstname :{
       type : String,
       required: true
   },
   lastname : {
    type : String,
    required: true  
   },
   email : {
    type : String,
    required: true,
    unique : true  
   },
  mobi :{
    type : Number,
    required: true,
    unique : true  
  },
  dob : {
    type : String,
    required: true 
  },
  password : {
    type : String,
    required: true   
  },
  cpassword : {
    type : String,
    required: true 
  }
   
})

const Register=new mongoose.model("Register",peopleSchema);
module.exports= Register;