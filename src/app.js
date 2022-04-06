const express =require("express");
const path = require("path");
const app= express();// providing all properties of express to app variable
const https = require("https");
const bodyParser = require("body-parser");//
app.use(bodyParser.urlencoded({extended: true}));
const hbs=require("hbs");
require("./db/conn");
const Register = require("./models/registers");
const {json} =require("express");
const async = require("hbs/lib/async");
const port= process.env.PORT || 3000;
const static_path= path.join(__dirname,"/public");
const template_path= path.join(__dirname,"/templates/views");
const partials_path= path.join(__dirname,"/templates/partials");
app.use(express.json());//
app.use(express.urlencoded({extended : false}));
app.use(express.static(static_path));

//app.set("views", template_path);
app.set("view engine","hbs");
hbs.registerPartials(partials_path);
app.get("/",(req,res)=>{
 res.render("index");
});
app.get("/register",(req,res)=>{
  res.render("register");
});
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/weather",(req,res)=>{
  res.render("weather");
});

app.post("/register",async(req,res)=>{
    try{
     const password = req.body.password;
     const cpassword = req.body.cpassword;
     if(password===cpassword){
   const Registerpeople = new Register({
     firstname : req.body.firstname,
     lastname  : req.body.lastname,
     email : req.body.email,
     mobi : req.body.mobi,
     dob : req.body.dob,
     password : req.body.password,
     cpassword : req.body.cpassword
   });

   const registered = await Registerpeople.save();
   res.status(201).render(index);
     } else{
         res.send("password not matched");
     }
    } catch(error){
       res.status(400).send(error);
    }
  });
  app.post("/login",async(req,res)=>{
    try{
      const email= req.body.email;
      const username = req.body.username;
      const  password = req.body.password;
      const useremail=  await Register.findone({email: email});
       if(useremail.password===password){
         res.status(201).render("index");
       }else{
         res.send("password not matched");
       }
    } catch(error){
      res.status(400).send("invalid email");
    }
});
app.post("/weather",function(req,res){
  const query=req.body.cityname;
  const apikey ="50afad95555927d821294505396887d1";
  const unit = "metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query + "&appid="+apikey+ "$units=" + unit;
   https.get(url,function(response){
   console.log(response.statusCode);
   response.on("data",function(data){
  const weatherData= JSON.parse(data);
  const temp =weatherData.main.temp;
  const weatherDescription= weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const imageUrl ="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
  res.write("<p>The weather is currently " + weatherDescription + "<p>");
   res.write("<h1>the tempaerature in" + query+ " is"+ temp+ "degree celcius<h1>");
   res.write("<img src="+ imageUrl + ">");
   res.send();
   });
  });
   
});

app.listen(port,()=>{//listening server
console.log(`sever is running port numbe ${port}`);
});