const User  = require("../models/user")
const {check , validationResult} = require('express-validator')


exports.signup = (req,res)=>{

    const errors = validationResult(req)
    console.log(validationResult(req));
    
    if (!errors.isEmpty()) {
        return res.status(422).json({
            err : errors.array()[0].msg
        })
    }

    const user = new User(req.body)  
    user.save((err,user)=>{
        // console.log(err);
        
        if(err) {
            return res.status(400).json({
                err:"not able to save user in db"
            })
        }
        return res.status(200).json(user)
    })   
}

exports.signout = (req,res)=>{
    // res.send("user has signed out success")
    res.json({
        message:"user signout"
    })
}

