const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);

// Habilita CORS para todas as rotas
app.use(cors());

const peerServer = ExpressPeerServer(server, {
    path: '/peerjs',
    debug: true,
});

app.use('/olla', peerServer);
app.get('/', (req, res) => {
    res.send('<h1>Olla Server!</h1>');
});

server.listen(9000, () => {
    console.log('PeerJS server is running on port 9000');
});