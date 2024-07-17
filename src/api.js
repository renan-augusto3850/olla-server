'use strict';
const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');
const serverless = require('serverless-http');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Habilita CORS para todas as rotas
app.use(cors());

const router = express.Router();
router.get("/hello", (req, res) => res.send("Hello World!"));
router.get('/', (req, res) => {
    res.send('<h1>Olla Server!</h1>');
});

app.use('/.netlify/functions/api', router);

const peerServer = ExpressPeerServer(server, {
    path: '/peerjs',
    debug: true,
});

app.use('/olla', peerServer);
console.log("Hello");

module.exports.handler = serverless(app);
