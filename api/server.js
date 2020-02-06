const express = require('express');
const userRouter = require('../routes/user_router.js');
const strainRouter = require('../routes/strain_routes.js')

const configureMiddleware = require('./configure-middleware.js')

const server = express();

configureMiddleware(server);

server.use('/api/user', userRouter);
server.use('/api/strain', strainRouter);//find strains

server.get('/', (req, res) => {
    res.status(200).json({ api: "You are in"});
});

server.get("/api", (req, res) => {
    res.status(200).json({ api: "You are getting closer..."})
});

module.exports = server;