const express = require('express')
const router = express.Router()
const {check , validationResult} = require('express-validator')
const {signout ,signup , signin ,isSignedIn,isAuthenticated} = require('../controllers/authentication')


router.post("/signup",
[
    check("name","name should be atlest 3 characters").isLength({min:3}),
    check("email","give the proper email").isEmail(),
    check("password","password should be atleast 5 characters").isLength({min:5,max:45})
    /////can also be done as the following way//////
    // check('password')
    // .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
    // .matches(/\d/).withMessage('must contain a number')
    //////////////////////
],signup)


router.post("/signin",
[
    check("email","give the proper email").isEmail(),
    check("password","password field should be atleast 5 characters").isLength({min:5,max:45})
   
],signin)

router.get("/signout",signout)
router.get("/test",isAuthenticated,(req,res)=>{
    res.json(req.auth)
})

module.exports = router;