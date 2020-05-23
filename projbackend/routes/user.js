const express = require("express")
const router = express.Router()

const {getUserByID,getUser,getallUsers} =  require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin} =  require("../controllers/authentication")

router.param("userId",getUserByID)

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)

router.get("/users",getallUsers)

module.exports = router