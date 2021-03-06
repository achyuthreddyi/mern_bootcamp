const User  = require("../models/user")
const {check , validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const expressJwt = require("express-jwt")
require('dotenv').config()


exports.signup = (req,res)=>{
    // what is validation result come back here and check
    const errors = validationResult(req)
    // console.log(validationResult(req));    
    if (!errors.isEmpty()) {
        return res.status(422).json({
            err : errors.array()[0].msg
        })
    }
    const user = new User(req.body)  
    user.save((err,user)=>{
        // console.log(err);        
        if(err) {
            // console.log(err);            
            return res.status(400).json({
                err:"not able to save user in db"
            })
        }
        // late send to what ever is required to the front end
        return res.status(200).json(user)
    })   
}
exports.signin = (req,res) =>{
    //  destructuring of application
    const {email,password} = req.body;
    const errors = validationResult(req)
    // console.log(validationResult(req));    
    if (!errors.isEmpty()) {
        return res.status(422).json({
            err : errors.array()[0].msg
        })
    }
    User.findOne({email} , (err,user)=>{
        if(err || !user ){            
            return res.status(400).json({
                error : "user email does not exist"
            })
        }  
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"email and password do not match"
            })
        }
        // create a token
        const token = jwt.sign({_id:user._id},process.env.SECRET)
        // put token in cookie
        res.cookie("token",token,{expire:new Date() + 9999})
        // send response to front end
        const {_id,name,email,role} = user;
        return res.json({token,user:{_id,name,email,role}})
    })
}
exports.signout = (req,res)=>{
    res.clearCookie("token")
    res.json({
        message:"user signout successful"
    })    
}
// protected routes
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
    // console.log();
    
})


//custom middlewares

exports.isAuthenticated = (req,res,next) => {
    // test this route after creating the front end
    let checker = req.profile && req.auth  && req.profile._id ===req.auth._id;
    if (!checker){
        return res.status(403).json({
            error :"ACCESS DENIED"
        })
    }
    return res.status(200).json({
        msg : "access not denied"
    })
    next();
}
exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error : "you are not admin , access denied you bitch!!!"
        })
    }

    next();
}