const express = require('express')
const User = require("../models/user")
const router = express.Router()
const {getUserById,getUser} = require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/authentication")

router.param("userId",getUserById)

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)
router.get("/user",(req,res)=>
{
    res.send("inside the user route")
})

module.exports = router()