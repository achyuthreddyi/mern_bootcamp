const user = require("../models/user")

exports.getUserById = (req,res,next,id) => {
    user.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"no user was found in DB"
            })
        }
        req.profile = user
        next()
    })

}

exports.getUser = (req,res) =>{
    //TODO get back here for password
    return res.json(req.profile)

}