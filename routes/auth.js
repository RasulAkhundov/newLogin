const express = require("express");
const { check, validationResult } = require('express-validator');
const User = require("../models/user-model");

const router = express.Router();


// routerler olacaq
router.post('/register', 
    [
        check("email").isEmail(),
        check("password").isLength({ min: 6 }),
        check("username").isLength({ min: 3, max: 12 })    
    ]
, (req, res) => {

    const { email, username, password, rpassword } = req.body;

    if (password !== rpassword) {
        return res.status(422).json({ errors: "Password is not match" })
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = new User({
        email, username
    })
    user.setPassword(password)
    user
        .save()
        .then(newUser => {
            res.status(200).json({ user: newUser.generateJWT() })
        })
        .catch(err => {
            res.status(434).json({ error: err });
        })

});

router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;

    await User.findOne({ email })
        .then(user => {
            if (user) {
                if (user.checkPassword(password)) {
                    res.json({ user: user.generateJWT() })
                } else {
                    res.status(422).json({errors:  "Password not match" })
                }
            } else {
                res.status(422).json({errors:  "Email not found" })
            }
        })

});


module.exports = router;


