const mongoose =require("mongoose"); //connecting database 
mongoose.connect("mongodb://localhost:27017/loginin",{ // .connect is a promise function
 useNewUrlParser:true, // avoid deprication warning 
 useUnifiedTopology:true


}).then(()=>{  //promise fulfilled than connection sucessful else no connection
    console.log("connection sucessful");
}).catch((error) =>{
 console.log("no connection");
})