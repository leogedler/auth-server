const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret );
}

const signup = (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(422).json({error: 'You must define an emai and password'});

    //  See if a user with the given email exists
    User.findOne({ email}).then((existingUser)=>{
        // If a user with email does exist, return an error
        if(existingUser)  return res.status(422).send({error: 'email is in use'});

        // If a user with email does NOT exist, create and save user record
        const user = new User({
            email,
            password
        })
        return user.save();
    }).then((userCreated) => {    
        return res.json({ token: tokenForUser(userCreated) });
    }).catch((err)=>{
        console.log('error', err);
        return res.status(500).json(err);
    })
}

const signin = (req, res, next) => {
    // User has already had their email and password auth
    // We just need to give them a token
    return res.json({ token: tokenForUser(req.user) });
}

module.exports = { signup, signin };