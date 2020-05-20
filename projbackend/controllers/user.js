const user = require("../models/user")

exports.getUserById = (req,res,next,id) => {
    // searching in the database
    user.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"no user was found in DB"
            })
        }
        req.profile = user
        next()
    });

}

exports.getUser = (req,res) =>{
    //TODO get back here for password
    req.profile.salt = undefined
    req.profile.encrypt_password = undefined
    return res.json(req.profile)

}