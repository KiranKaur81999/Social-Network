const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const User = require('../../models/Users');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route POST /api/users
// @desc  Register Users
// @access Public
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please enter a valid Email').isEmail(),
    check('password','Please enter a password of 6 or more characters').isLength({min:6})
],
async (req,res)=>{
    console.log(req.body);
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    
    const {name,email,password} = req.body;
    let image = '';

    try{
        // check if User exists 
        let user = await User.findOne({email});

        if(user){
           return res.status(400).json({errors: [{message: "User already exits"}]});
        }

        // adding gravatar

        const avatar = gravatar.url(email,{
            s:"200",
            r:"pg",
            d:"mm"
        });

        user = new User({
            name,
            email,
            avatar,
            image,
            password
        });

        // Encrypt Password

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();

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