const express = require("express")
const router = express.Router()

const {getUserByID,getUser} =  require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin} =  require("../controllers/authentication")

router.param("userId",getUserByID)

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)

module.exports = router