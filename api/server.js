'use strict';
import express, { Router } from 'express';
import { ExpressPeerServer } from 'peer';
import cors from 'cors';
import serverless from 'serverless-http';
import http from 'http';

const api = express();


const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));


api.use("/api/", router);

const app = express();
const server = http.createServer(app);

// Habilita CORS para todas as rotas
app.use(cors());

const peerServer = ExpressPeerServer(server, {
    path: '/peerjs',
    debug: true,
});

app.use('/olla', peerServer);
router.get('/', (req, res) => {
    res.write('<h1>Olla Server!</h1>');
});

export default app;