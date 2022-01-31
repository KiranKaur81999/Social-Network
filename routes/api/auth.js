const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');


// @route GET /api/auth
// @desc  Test route
// @access Public
router.get('/',auth,async (req,res)=>{
    //res.send('Auth');
    try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route POST /api/auth
// @desc  Authenticate Users & get token
// @access Public
router.post('/',[
    check('email','Please enter a valid Email').isEmail(),
    check('password','Please enter a password of 6 or more characters').exists()
],
async (req,res)=>{
    console.log(req.body);
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    
    const {email,password} = req.body;

    try{
        // check if User exists 
        let user = await User.findOne({email});

        if(!user){
           return res.status(400).json({errors: [{message: "Invalid Credentials"}]});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({errors: [{message: "Invalid Credentials"}]});
        }
       

        // Add jsonwebtoken

        const payload = {
            user:{
                id: user.id
            }
        };

        jwt.sign(payload,
            config.get('jwtSecret'),
            {expiresIn:360000},
            (err,token)=>{
               if(err) throw err;
               res.json({token}); 
            });

        
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports=router;