const mongoose = require('mongoose');
const express = require('express')
const app = express()
require('dotenv').config()

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('DB CONNECTED');    
}).catch(()=>{
    console.log('DB GOT OPPS');    
})


const port = process.env.PORT || 8000;

app.listen(port,_=>{
     console.log(`app is running at ${port}`);
})