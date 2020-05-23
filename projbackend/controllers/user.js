const User = require("../models/user");


exports.getUserByID = (req,res,next,id)=>{
    console.log(id);
    
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
exports.getallUsers = (req,res)=>{
    User.find().exec((err,user)=>{
        if(err || !user){
            console.log(err);
            
            return res.status(400).json({
                error : " no user to throw on to he screen"
            })
        }
        req.profile = user
        return res.json(req.profile)
    })
    
}
exports.getUser = (req,res)=> {
    //TODO : get back here for password
    req.profile.salt = undefined
    req.profile.encrypt_password = undefined
    return res.json(req.profile)

}