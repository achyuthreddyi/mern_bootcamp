require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodybarser = require('body-parser')
const cookieparser = require('cookie-parser')
const cors = require('cors')

// my routes 
const authRoutes = require('./routes/authentication')
const userRoutes = require('./routes/user')


//DB connections
mongoose
    .connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
    })
    .then(()=>{
        console.log('DB CONNECTED');    
    })
    .catch(()=>{
        console.log('DB GOT OPPS');    
    })

// middlewares
app.use(bodybarser.json())
app.use(cookieparser())
app.use(cors())

//my routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)

app.get("/",(req,res)=>{
    res.send("hey man")
})

const port = process.env.PORT || 8000;
// starting a server
app.listen(port,_=>{
     console.log(`app is running at ${port}`);
})