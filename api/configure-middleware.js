const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);
const knex = require('../database/dbConfig.js');
const secret = require('./secret.js');

const sessionConfig = {
    //sessions storage options
    secret: secret.jwtSecret,
    name: "Galleta",
    resave: false,
    saveUninitialized: true, //true during dev, false for prod

    //how to store session
    store: new KnexSessionStore({
        knex,
        createtable: true, 
        clearInterval: 60000,
        tablename: "sessions",
        sidfiledname: "sid"
    }),

    //cookie options
    cookie: {
        maxAge:60000,
        secure: process.env.NODE_ENV === "production" ? true: false,
        httpOnly: true
    }
};

module.exports = server =>{
    server.use(helmet());
    server.use(express.json());
    server.use(cors({origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true
}));
    server.use(sessions(sessionConfig));
};