const express = require("express")
const app =  express()
const db=require('./config/connection')
const userRoute = require("./routes/user")
const cors = require("cors")


db.connect((err)=>{
    if(err)console.log("connection error"+err);
    else console.log("database connect");
  
  })
app.use(express.json())
app.use(cors()) 
app.use('/',userRoute)


app.listen(4000,()=>console.log("port connected"))