const User = require("../models/user");


exports.getUserByID = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user ){ 
            return res.status(400).json({
                error: "no user was found in the db"
            })            
        }
        req.profile = user
        next()

    })

}

exports.getUser = (req,res)=> {
    //TODO : get back here for password
    req.profile.salt = undefined
    req.profile.encrypt_password = undefined
    return res.json(req.profile)

}