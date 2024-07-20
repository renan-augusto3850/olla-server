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

app.use('/peerjs', peerServer);
app.get('/', (req, res) => {
  res.send('<h1>Olla Server!</h1>');
});

server.listen(9000, () => {
  console.log('PeerJS server is running on port 9000');
});

exports.handler = async (event, context) => {
  // Simula a solicitação HTTP do Netlify para o Express
  const req = {
    method: event.httpMethod,
    url: event.path,
    headers: event.headers,
    body: event.body,
    query: event.queryStringParameters
  };

  const res = {
    setHeader: (name, value) => {
      callback(null, {
        statusCode: 200,
        headers: {
          [name]: value
        },
        body: ''
      });
    },
    end: (body) => {
      callback(null, {
        statusCode: 200,
        body: body
      });
    },
    writeHead: (statusCode, headers) => {
      callback(null, {
        statusCode: statusCode,
        headers: headers,
        body: ''
      });
    },
    write: (body) => {
      res.body = body;
    }
  };

  app(req, res);
};
