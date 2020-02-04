const router = require('express').Router();
const bcrypt = require('bcryptjs');
const authenticated = require('../api/authenticate_middleware');
const restricted = require('../api/restricted-middleware');
const jwt = require('jsonwebtoken');
const secretSauce = require('../api/secret');

const Users = require("../models/user_model");

router.get('/users', (req, res) =>{
    Users.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err)
    })
});

router.get('/users/:id', authenticated, (req, res) => {
    const { id } = req.params;
    Users.findById(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err)
    })
});

router.post("/register", (req, res) => {
    let {username, password} = req.body;
    const hash = bcrypt.hashSync(password, 8);

    Users.add({username, password: hash})
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                const token = signToken(user);
                res.status(200).json({message: `Hola, ${user.username}!`, token });
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
});

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(error => {
            if (error) {
                console.log(error);
                res.status(401).json({errorMessage: "No User to Logout."})
            } else {
                res.status(200).json({message: "You've been logged out."})
            }
        });
    }
});

function signToken(user) {
    const payload = {
        username: user.username
    };
    const secret = process.env.JTW_SECRET || secretSauce.jwtSecret;

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secret, options)
}

module.exports = router